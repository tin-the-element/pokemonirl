import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import MoonLoader from "react-spinners/MoonLoader";
Amplify.configure(awsExports);

function RiddleTask() {
  const history = useHistory();

  const [postMoveMessage, setPostMoveMessage] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState();

  const [usersPokemons, setUsersPokemon] = useState([]);

  const [riddleTaskData, setRiddleTaskData] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState();
  const [loading, setLoading] = useState(true);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [showPartyButton, setShowPartyButton] = useState("Show Party");
  const [partyPokemon, setPartyPokemon] = useState(null);
  const [notFinished, setNotFinished] = useState(true);
  const [moveTypeUsed, setMoveTypeUsed] = useState("");
  const [completed, setCompleted] = useState(false);
  const [moveUsed, setMoveUsed] = useState(false);
  const [oldMove, setOldMove] = useState("");

  let { id } = useParams();
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();

        const email = await authUser.attributes.email;

        const userData = await API.graphql({
          query: queries.getAccount,
          variables: { id: email },
        });
        const pokemonIds = userData.data.getAccount.main_pokemon;
        var newPokemons = [];
        const pokemonData = await API.graphql({
          query: queries.listUserPokemons,
          variables: {
            filter: {
              accountID: {
                eq: email,
              },
            },
            limit: 100000000,
          },
        });

        var usersPokemons = pokemonData.data.listUserPokemons.items;

        for (var key in usersPokemons) {
          if (pokemonIds.includes(usersPokemons[key].id)) {
            newPokemons.push(usersPokemons[key]);
          }
        }

        var newMoves = [];
        var firstPokemon = newPokemons[0];
        for (var move in firstPokemon.movelist) {
          newMoves.push(JSON.parse(firstPokemon.movelist[move]));
        }
        const riddleTask = await API.graphql({
          query: queries.getRiddleTask,
          variables: { id: id },
        });

        setRiddleTaskData(riddleTask["data"]["getRiddleTask"]);
        setTurnsLeft(riddleTaskData.turns_permitted);
        setAvailableMoves(newMoves);
        setUsersPokemon(newPokemons);
        setSelectedPokemon(firstPokemon);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (loading) {
      fetchProblem();
    } else if (turnsLeft !== null) {
      setNotFinished(false);
    } else {
    }

    if (moveUsed && turnsLeft !== 0) {
      move_effect();
    }

    async function handle_win() {
      for (var key in usersPokemons) {
        let updatedPokemon = usersPokemons[key];

        updatedPokemon.exp_until_level -= riddleTaskData.exp_given;

        if (updatedPokemon.exp_until_level <= 0) {
          updatedPokemon.level += 1;
          updatedPokemon.exp_until_level =
            updatedPokemon.level * 10 + updatedPokemon.exp_until_level;

          let response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + updatedPokemon.pokemon + "/"
          );
          let data = await response.json();
          let moves = data.moves;

          for (key in moves) {
            var versions = moves[key].version_group_details;
            for (var k in versions) {
              var version = versions[k];
              if (
                version.move_learn_method.name === "level-up" &&
                version.version_group.name === "ultra-sun-ultra-moon"
              ) {
                if (version.level_learned_at === updatedPokemon.level) {
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
                  if (!updatedPokemon.movelist.includes(moveString))
                    updatedPokemon.movelist.push(moveString);
                }
              }
            }
          }
        }

        const newUpdatedPokemon = {
          id: updatedPokemon.id,
          accountID: updatedPokemon.email,
          pokemon: updatedPokemon.pokemon,
          image: updatedPokemon.image,
          movelist: updatedPokemon.returned_moves,
          level: updatedPokemon.level,
          exp_until_level: updatedPokemon.exp_until_level,
        };
        const updatePokemon = await API.graphql(
          graphqlOperation(mutations.updateUserPokemon, {
            input: newUpdatedPokemon,
          })
        );
      }

      const authUser = await Auth.currentAuthenticatedUser();

      const email = await authUser.attributes.email;

      const userData = await API.graphql({
        query: queries.getAccount,
        variables: { id: email },
      });
      userData.data.getAccount.money += riddleTaskData.reward;
      const oldAccountData = userData.data.getAccount;
      if (!oldAccountData.completed_tasks.includes(riddleTaskData.id)) {
        oldAccountData.completed_tasks.push(riddleTaskData.id);
      }
      const newAccountData = {
        id: oldAccountData.id,
        username: oldAccountData.username,
        users_pokemon: oldAccountData.pokemon_list,
        main_pokemon: oldAccountData.main_pokemon,
        money: oldAccountData.money,
        completed_tasks: oldAccountData.completed_tasks,
      };
      const updateUser = await API.graphql(
        graphqlOperation(mutations.updateAccount, { input: newAccountData })
      );

      history.push({
        pathname: "/won_task",
        state: {
          name: riddleTaskData.name,
          quote: riddleTaskData.win_quote,
          exp_given: riddleTaskData.exp_given,
          money_gained: riddleTaskData.reward,
        },
      });
    }

    async function handle_lost() {
      const authUser = await Auth.currentAuthenticatedUser();

      const email = await authUser.attributes.email;

      const userData = await API.graphql({
        query: queries.getAccount,
        variables: { id: email },
      });
      userData.data.getAccount.money -= 100;
      if (userData.data.getAccount.money < 0) {
        userData.data.getAccount.money = 0;
      }
      const oldAccountData = userData.data.getAccount;
      const newAccountData = {
        id: oldAccountData.id,
        username: oldAccountData.username,
        users_pokemon: oldAccountData.pokemon_list,
        main_pokemon: oldAccountData.main_pokemon,
        money: oldAccountData.money,
        completed_tasks: oldAccountData.completed_tasks,
      };
      const updateUser = await API.graphql(
        graphqlOperation(mutations.updateAccount, { input: newAccountData })
      );

      history.push({
        pathname: "/lost_task",
        state: {
          name: riddleTaskData.name,
          quote: riddleTaskData.lose_quote,
          exp_given: riddleTaskData.exp_given,
        },
      });
    }

    function check_win() {
      if (completed) {
        handle_win();
        return true;
      }
    }

    function check_lose() {
      if (turnsLeft <= 0) {
        handle_lost();
      }
    }

    if (!check_win()) {
      check_lose();
    }
  }, [
    id,
    loading,
    turnsLeft,
    riddleTaskData.turns_permitted,
    riddleTaskData.total_hp,
    usersPokemons,
    selectedPokemon,
    history,
    riddleTaskData.exp_given,
    riddleTaskData.lose_quote,
    riddleTaskData.name,
    riddleTaskData.win_quote,
  ]);

  function move_effect() {
    let old_type_transition = oldMove + "_transition";
    let old_layer = oldMove + "_layer";

    let type_transition = moveTypeUsed + "_transition";
    let new_layer = moveTypeUsed + "_layer";

    if (
      document
        .getElementById("battle_layer")
        .classList.contains(old_type_transition)
    ) {
      document
        .getElementById("effect_div")
        .classList.remove("effect_transition");
      document.getElementById("battle_layer").classList.remove(old_layer);
      document
        .getElementById("battle_layer")
        .classList.remove(old_type_transition);
    }

    setTimeout(function () {
      document.getElementById("effect_div").classList.add("effect_transition");
      document.getElementById("battle_layer").classList.add(type_transition);
      document.getElementById("battle_layer").classList.add(new_layer);
    }, 10);

    setMoveUsed(false);
  }

  function try_attack(move) {
    setOldMove(moveTypeUsed);
    setMoveTypeUsed(move.type);

    if (move.name.toLowerCase() === riddleTaskData.answer[0].toLowerCase()) {
      setCompleted(true);
      setPostMoveMessage("Your attack was effective!");
    } else {
      setPostMoveMessage("Your attack was not effective, please try again!");
    }
    setMoveUsed(true);

    setTurnsLeft(turnsLeft - 1);
  }

  function showParty() {
    if (showPartyButton === "Show Party") {
      document.getElementById("party_div").style.display = "flex";
      setShowPartyButton("Hide Party");
    } else {
      document.getElementById("party_div").style.display = "none";
      setShowPartyButton("Show Party");
    }
  }

  function swapPokemon() {
    if (partyPokemon !== null) {
      setSelectedPokemon(partyPokemon);
      document.getElementById(partyPokemon.id).style.border = "none";
      document.getElementById(partyPokemon.id).style.cursor = "pointer";
      var newMoves = [];
      for (var move in partyPokemon.movelist) {
        newMoves.push(JSON.parse(partyPokemon.movelist[move]));
      }

      setAvailableMoves(newMoves);
      setPartyPokemon(null);
    }
  }

  function changeSelectedPokemon(pokemon) {
    if (partyPokemon !== null) {
      document.getElementById(partyPokemon.id).style.border = "none";
      document.getElementById(partyPokemon.id).style.cursor = "pointer";
    }
    document.getElementById(pokemon.id).style.border = "2px white solid";
    document.getElementById(pokemon.id).style.cursor = "not-allowed";
    setPartyPokemon(pokemon);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div class="battle_div">
      {notFinished ? (
        <MoonLoader color={"white"} loading={"true"} size={150} />
      ) : (
        <div class="battle">
          <div class="problem">
            <h3>Problem: {riddleTaskData.question}</h3>
            <h4>Turns Left: {turnsLeft}</h4>
            <div
              id="battle_div"
              style={{
                backgroundImage:
                  "url(/assets/riddle_tasks/" +
                  riddleTaskData["images"] +
                  ".jpg",
              }}
            >
              <img
                id="battle_image"
                class="battle_image"
                alt={riddleTaskData.name}
                src={
                  "/assets/riddle_tasks/" + riddleTaskData["images"] + ".jpg"
                }
              ></img>
              <div id="battle_layer"></div>
              <div id="effect_div" className={"effect_div"}>
                <img
                  className="effect_img"
                  alt={moveTypeUsed}
                  src={"/assets/move_effects/" + moveTypeUsed + ".png"}
                ></img>
                <img
                  className="effect_img"
                  alt={moveTypeUsed}
                  src={"/assets/move_effects/" + moveTypeUsed + ".png"}
                ></img>
                <img
                  className="effect_img"
                  alt={moveTypeUsed}
                  src={"/assets/move_effects/" + moveTypeUsed + ".png"}
                ></img>
                <img
                  className="effect_img"
                  alt={moveTypeUsed}
                  src={"/assets/move_effects/" + moveTypeUsed + ".png"}
                ></img>
              </div>
            </div>
            <h4>{postMoveMessage}</h4>
          </div>
          {completed ? (
            <div class="center-div">
              <MoonLoader color={"white"} loading={"true"} size={150} />
              <h3>
                Calculating if any of your pokemon have leveled up or learned
                any moves...
              </h3>
            </div>
          ) : (
            <div class="user_space">
              <div id="party_div">
                <h3>Your pokemon</h3>
                <div id="user_party">
                  {usersPokemons.map((pokemon, key) => (
                    <div
                      id={pokemon.id}
                      onClick={() => changeSelectedPokemon(pokemon)}
                      className={"user_party_item"}
                      key={key}
                    >
                      <div className={pokemon.types[0]}>
                        <img alt={pokemon.name} src={pokemon.image}></img>
                      </div>
                      <p>{pokemon.nickname}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => showParty()}>{showPartyButton}</button>
              <button id="swap_pokemon" onClick={() => swapPokemon()}>
                Swap Pokemon
              </button>
              <div class="user_pokemon">
                <h3>{selectedPokemon.nickname} </h3>
                <div className={selectedPokemon.types[0]}>
                  <img
                    class="user_pokemon_image"
                    alt={selectedPokemon.pokemon}
                    src={selectedPokemon.image}
                  ></img>
                </div>

                <h3>
                  {toTitleCase(selectedPokemon.pokemon.replace("-", " "))} Lv
                  {selectedPokemon.level}
                </h3>
              </div>

              <div class="move_div">
                <h3>Moves</h3>
                <div
                  className={selectedPokemon.types[0] + " pokemon_move_list"}
                >
                  {availableMoves.map((move, key) => (
                    <div
                      class="pokemon_move_list_item_div"
                      onClick={() => try_attack(move)}
                      key={key}
                    >
                      <h3 className={"pokemon_move_list_item " + move.type}>
                        {toTitleCase(move.name.replace("-", " "))}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default withAuthenticator(RiddleTask);
