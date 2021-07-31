import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import Auth from '@aws-amplify/auth'
Amplify.configure(awsExports);

const initialState = { nickname: ''}

function ChoosePokemon() {
    const [formState, setFormState] = useState(initialState)
    const [chosenPokemon, setChosenPokemon] = useState('')
    const [pokemons, setPokemons] = useState([])
    const [typeSearch, setTypeSearch] = useState('null')
    const [types, setTypes] = useState([])
    const [loadPokemon, setLoadPokemon] = useState(true)

    useEffect(() => {
        if (loadPokemon) {
          fetchPokemon()
          fetchTypes()
        }
        try {
          document.getElementById(chosenPokemon).style.backgroundColor = "white"
          document.getElementById(chosenPokemon).style.color = "black"
        } catch {

        }
        console.log('change')
      })

      async function fetchTypes() {
        try {
          const typeData = await API.graphql({query: queries.listTypes})
          const sortTypes = typeData.data.listTypes.items.sort(function(a, b){return a.api_id - b.api_id})
          setTypes(sortTypes)
        } catch (err) {
          console.log(err)
        }
      }

      async function fetchPokemon() {
        try {
            if (typeSearch === 'null') {
              const pokemonData = await API.graphql({ query: queries.listPokemons, variables: {limit: 900}})
              const pokemonitems = pokemonData.data.listPokemons.items
              pokemonitems.sort(function(a, b ) {return a.api_id - b.api_id})
              setPokemons(pokemonitems)
            } else {
              const pokemonData = await API.graphql({ query: queries.listPokemons, variables: {filter: {
                types: {
                    contains: typeSearch
                }
              },  limit: 900}})
              const pokemonitems = pokemonData.data.listPokemons.items
              pokemonitems.sort(function(a, b ) {return a.api_id - b.api_id})
              setPokemons(pokemonitems)
            }
            setLoadPokemon(false)
            
          
        } catch (err) { console.log(err) }
      }

      function searchType(event) {
        event.preventDefault()
        var e = document.getElementById("type");
        var type = e.value;  

        setTypeSearch(type)
        setLoadPokemon(true)
        return false
      }

      function makeSelected(pokemon) {
        if (chosenPokemon !== '') {
          document.getElementById(chosenPokemon).style.backgroundColor = "initial"
          document.getElementById(chosenPokemon).style.color = "inherit"
        }
        setChosenPokemon(pokemon)
        document.getElementById(pokemon).style.backgroundColor = "white"
      }

      async function getMoves(link, level, pokemonData) {
        let returned_moves = []
        fetch(link)
        .then(res => res.json())
        .then((result) => {
            var moves = result.moves
            for (var key in moves) {
              var versions = moves[key].version_group_details
              for (var k in versions) {
                var version = versions[k]
                if (version.move_learn_method.name === "level-up" && version.version_group.name === "ultra-sun-ultra-moon") {
                  if (version.level_learned_at <= level) {
                    console.log(moves[key].move.name)
                    let move = moves[key].move.name
                    if (!returned_moves.includes(move))
                      returned_moves.push(move)
                  }
                }
                
              }
                
            }
            console.log();
            pokemonData = pokemonData.data.createUserPokemon
            
            var updatedPokemon = {id: pokemonData.id ,accountID: pokemonData.email, pokemon: pokemonData.pokemon, image: pokemonData.image, movelist: returned_moves, level: pokemonData.level, exp_until_level: pokemonData.exp_until_level}
            const newPokemon = API.graphql(graphqlOperation(mutations.updateUserPokemon, {input: updatedPokemon}))
        },
        (error) => {
            console.log(console.log(error))
            
        })
        console.log(returned_moves)
        return returned_moves
      
      }

      async function selectPokemon() {
        

        

        // Find account in DB
        const authUser = await Auth.currentAuthenticatedUser()
        const email = authUser.attributes.email



        // Add new pokemon to DB
        console.log(chosenPokemon);
        const pokemonData = await API.graphql({query: queries.listPokemons, variables: {filter: {
          name: {
            eq: chosenPokemon
          }
        },  limit: 900}});
        console.log(pokemonData.data.listPokemons.items[0].api);

        const nicknames = { ...formState }
        const newPokemonData = {accountID: email, nickname: nicknames.nickname, pokemon: chosenPokemon, image: pokemonData.data.listPokemons.items[0].image, movelist: [], level: 10, exp_until_level: 100}
        const newPokemon = await API.graphql(graphqlOperation(mutations.createUserPokemon, {input: newPokemonData}))

        // Add pokemon to account
        const accountData = await API.graphql({ query: queries.getAccount, variables: {id: email}})
        const oldAccountData = accountData.data.getAccount
        let pokemon_list = oldAccountData.users_pokemon
        pokemon_list.push(newPokemon.data.createUserPokemon.id)
        const newAccountData = {id: oldAccountData.id, username: oldAccountData.username, users_pokemon: pokemon_list, money: oldAccountData.money, completed_tasks: oldAccountData.completed_tasks}
        const setData =  await API.graphql(graphqlOperation(mutations.updateAccount, {input: newAccountData}))
    
        console.log(setData)
        const newMoves = await getMoves(pokemonData.data.listPokemons.items[0].api, 10, newPokemon)
      }

      function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
      }

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    

    return (
      <div className="center-div">
        <h3>Currently Selected Pokemon: {toTitleCase(chosenPokemon)}</h3>
        <form>
          <label>Nickname: </label>
          <input style={{width: '200px'}} onChange={event => setInput('nickname', event.target.value)} value={formState["nickname"]} placeholder="Leave empty for no nickname" />
        </form>
        <button onClick={selectPokemon}>Choose Selected Pokemon</button>
        <form onSubmit={searchType}>
          <label for="type">Type</label>
          <select name="type" id="type">
            <option value='null'>none</option>
            {types.map((type, index) => (
              <option key={type.id ? type.id : index} value={type.name}>{type.name}</option>
            ))}
          </select>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
          <div className="pokemon-list-container">
              {
          pokemons.map((pokemon, index) => (
            <div id={pokemon.name} onClick={() => makeSelected(pokemon.name)} className="pokemon center-div" key={pokemon.id ? pokemon.id : index}>
              <h1>{toTitleCase(pokemon.name.replace("-", " "))}</h1>
              <img alt={pokemon.name.replace("-", " ")} src={pokemon.image}></img>
              <div className="pokemon_type_list">
              {pokemon.types.map((pokemonType, index) => (
                <h3 className={"pokemon_type_list_item " + pokemonType} key={pokemonType.id ? pokemonType.id : index}>{pokemonType}</h3>
              ))}
              </div>
              
            </div>
          ))
        }
          </div>
        </div>
    )
}


export default withAuthenticator(ChoosePokemon);