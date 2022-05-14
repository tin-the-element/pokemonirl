import React, { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  createMove,
  createPokemon,
  createSingleTask,
  createType,
} from "../../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Auth from "@aws-amplify/auth";
import { useHistory } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
Amplify.configure(awsExports);

const initialState = { nickname: "" };

function ChoosePokemon() {
  const history = useHistory();

  const [formState, setFormState] = useState(initialState);
  const [chosenPokemon, setChosenPokemon] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [typeSearch, setTypeSearch] = useState("null");
  const [types, setTypes] = useState([]);
  const [loadPokemon, setLoadPokemon] = useState(true);
  const [finishedBuying, setFinishedBuying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loadPokemon) {
      fetchPokemon();
      fetchTypes();
    }
    try {
      document.getElementById(chosenPokemon).style.backgroundColor = "white";
      document.getElementById(chosenPokemon).style.color = "black";
    } catch {}
  });

  async function fetchTypes() {
    try {
      const typeData = await API.graphql({ query: queries.listTypes });
      const sortTypes = typeData.data.listTypes.items.sort(function (a, b) {
        return a.api_id - b.api_id;
      });
      setTypes(sortTypes);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPokemon() {
    try {
      if (typeSearch === "null") {
        const pokemonData = await API.graphql({
          query: queries.listPokemons,
          variables: { limit: 900 },
        });
        const pokemonitems = pokemonData.data.listPokemons.items;
        pokemonitems.sort(function (a, b) {
          return a.api_id - b.api_id;
        });
        setPokemons(pokemonitems);
      } else {
        const pokemonData = await API.graphql({
          query: queries.listPokemons,
          variables: {
            filter: {
              types: {
                contains: typeSearch,
              },
            },
            limit: 900,
          },
        });
        const pokemonitems = pokemonData.data.listPokemons.items;
        pokemonitems.sort(function (a, b) {
          return a.api_id - b.api_id;
        });
        setPokemons(pokemonitems);
      }
      setLoadPokemon(false);
    } catch (err) {
      console.log(err);
    }
  }

  function searchType(event) {
    event.preventDefault();
    var e = document.getElementById("type");
    var type = e.value;

    setTypeSearch(type);
    setLoadPokemon(true);
    return false;
  }

  function makeSelected(pokemon) {
    if (chosenPokemon === pokemon) {
      return;
    }

    if (chosenPokemon !== "") {
      document.getElementById(chosenPokemon).style.backgroundColor = "initial";
      document.getElementById(chosenPokemon).style.color = "inherit";
    }
    setChosenPokemon(pokemon);
    document.getElementById(pokemon).style.backgroundColor = "white";
  }

  async function getMoves(link, level, pokemonData) {
    let returned_moves = [];
    let response = await fetch(link);
    let data = await response.json();
    let moves = data.moves;

    for (var key in moves) {
      var versions = moves[key].version_group_details;
      for (var k in versions) {
        var version = versions[k];
        if (
          version.move_learn_method.name === "level-up" &&
          version.version_group.name === "ultra-sun-ultra-moon"
        ) {
          if (version.level_learned_at <= level) {
            const moveData = await API.graphql({
              query: queries.listMoves,
              variables: {
                filter: {
                  name: {
                    eq: moves[key].move.name,
                  },
                },
                limit: 900,
              },
            });
            const move = moveData.data.listMoves.items[0];
            const moveString = JSON.stringify(move);
            if (!returned_moves.includes(moveString))
              returned_moves.push(moveString);
          }
        }
      }
    }
    pokemonData = pokemonData.data.createUserPokemon;
    var updatedPokemon = {
      id: pokemonData.id,
      accountID: pokemonData.email,
      pokemon: pokemonData.pokemon,
      image: pokemonData.image,
      movelist: returned_moves,
      level: pokemonData.level,
      exp_until_level: pokemonData.exp_until_level,
    };
    const newPokemon = API.graphql(
      graphqlOperation(mutations.updateUserPokemon, { input: updatedPokemon })
    );
    return returned_moves;
  }

  async function selectPokemon() {
    if (chosenPokemon === "") {
      setErrorMessage("Please choose a pokemon to adopt first!");
      return;
    }

    // Find account in DB
    const authUser = await Auth.currentAuthenticatedUser();
    const email = authUser.attributes.email;
    const accountData = await API.graphql({
      query: queries.getAccount,
      variables: { id: email },
    });
    if (accountData.data.getAccount.money < 200) {
      setErrorMessage("You do not have enough money to adopt a Pokemon");
      return;
    }

    setFinishedBuying(true);

    // Add new pokemon to DB
    const pokemonData = await API.graphql({
      query: queries.listPokemons,
      variables: {
        filter: {
          name: {
            eq: chosenPokemon,
          },
        },
        limit: 900,
      },
    });

    const nicknames = { ...formState };

    if (nicknames.nickname === "") {
      nicknames.nickname = toTitleCase(chosenPokemon);
    }

    const newPokemonData = {
      accountID: email,
      nickname: nicknames.nickname,
      pokemon: chosenPokemon,
      image: pokemonData.data.listPokemons.items[0].image,
      movelist: [],
      level: 10,
      exp_until_level: 100,
      types: pokemonData.data.listPokemons.items[0].types,
    };
    const newPokemon = await API.graphql(
      graphqlOperation(mutations.createUserPokemon, { input: newPokemonData })
    );

    // Add pokemon to account

    const oldAccountData = accountData.data.getAccount;
    let pokemon_list = oldAccountData.users_pokemon;
    pokemon_list.push(newPokemon.data.createUserPokemon.id);
    let main_pokemon_list = oldAccountData.main_pokemon;
    if (main_pokemon_list.length < 19) {
      main_pokemon_list.push(newPokemon.data.createUserPokemon.id);
    }
    const newAccountData = {
      id: oldAccountData.id,
      username: oldAccountData.username,
      users_pokemon: pokemon_list,
      main_pokemon: main_pokemon_list,
      money: oldAccountData.money - 200,
      completed_tasks: oldAccountData.completed_tasks,
    };
    const setData = await API.graphql(
      graphqlOperation(mutations.updateAccount, { input: newAccountData })
    );
    const newMoves = await getMoves(
      pokemonData.data.listPokemons.items[0].api,
      10,
      newPokemon
    );

    history.push({
      pathname: "/completed_purchase",
      state: {
        nickname: newPokemonData.nickname,
        pokemon: newPokemonData.pokemon,
        image: newPokemonData.image,
      },
    });
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="center-div">
      {finishedBuying ? (
        <MoonLoader color={"white"} loading={"true"} size={150} />
      ) : (
        <div className="center-div">
          <div className="shelter_title_div">
            <h1>Poke Shelter</h1>
          </div>
          <div className="choose_pokemon_container">
            <div className="center-div filter_pokemon_div">
              <form onSubmit={searchType}>
                <label for="type">Type</label>
                <select name="type" id="type">
                  <option value="null">none</option>
                  {types.map((type, index) => (
                    <option key={type.id ? type.id : index} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <br></br>
                <input type="submit" value="Submit" />
              </form>
            </div>
            <div className="center-div choose_pokemon_div">
              <h3>Currently Selected Pokemon: {toTitleCase(chosenPokemon)}</h3>
              <form>
                <label>Nickname: </label>
                <input
                  style={{ width: "200px" }}
                  onChange={(event) => setInput("nickname", event.target.value)}
                  value={formState["nickname"]}
                  placeholder="Leave empty for no nickname"
                />
              </form>
              <button onClick={selectPokemon}>Choose Selected Pokemon</button>
              {errorMessage !== "" ? <h3>{errorMessage}</h3> : <div></div>}
            </div>
          </div>
          <div className="pokemon-list-container">
            {pokemons.map((pokemon, index) => (
              <div
                id={pokemon.name}
                onClick={() => makeSelected(pokemon.name)}
                className="pokemon center-div"
                key={pokemon.id ? pokemon.id : index}
              >
                <h1>{toTitleCase(pokemon.name.replace("-", " "))}</h1>
                <img
                  alt={pokemon.name.replace("-", " ")}
                  src={pokemon.image}
                ></img>

                <div className="pokemon_type_list">
                  {pokemon.types.map((pokemonType, index) => (
                    <h3
                      className={"pokemon_type_list_item " + pokemonType}
                      key={pokemonType.id ? pokemonType.id : index}
                    >
                      {pokemonType}
                    </h3>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(ChoosePokemon);
