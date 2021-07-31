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

function UsersPokemon() {
    const [formState, setFormState] = useState(initialState)
    const [chosenPokemon, setChosenPokemon] = useState('')
    const [pokemons, setPokemons] = useState([])
    const [typeSearch, setTypeSearch] = useState('null')
    const [types, setTypes] = useState([])
    const [loadPokemon, setLoadPokemon] = useState([])



    useEffect(() => {
        if (loadPokemon) {
            console.log(loadPokemon)
            getEmail()
            fetchUsersPokemon()
        }
        
      })

      function getEmail() {
          // Find account in DB
          

      }

      async function fetchUsersPokemon() {
        try {


            const authUser = await Auth.currentAuthenticatedUser()
            
            const email = authUser.attributes.email

            const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})
            const pokemonIds = userData.data.getAccount.users_pokemon
            var newPokemons = []
            for (var key in pokemonIds) {
                const newPokemon = await API.graphql({query: queries.getUserPokemon, variables: {id: pokemonIds[key]}})
                
                var mapData = newPokemon.data.getUserPokemon
                const pokemonData = await API.graphql({query: queries.listPokemons, variables: {filter: {
                    name: {
                      eq: mapData.pokemon
                    }
                  },  limit: 900}});
                mapData.types = pokemonData.data.listPokemons.items[0].types
                newPokemons.push(mapData)
                
            }
            setPokemons(newPokemons)
            console.log(pokemons)
            setLoadPokemon(false)
            console.log(loadPokemon)
            
            
          
        } catch (err) { console.log(err) }
      }

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    

    return (
      <div className="center-div">
          <h1>Your Pokemon</h1>
          <div className="pokemon-list-container">
              {
          pokemons.map((user_pokemon, index) => (
            <div id={user_pokemon.pokemon} className="pokemon center-div" key={user_pokemon.id ? user_pokemon.id : index}>
              <h1>{user_pokemon.nickname}</h1>
              <h3>{toTitleCase(user_pokemon.pokemon.replace("-", " "))}</h3>
              <img alt={user_pokemon.pokemon.replace("-", " ")} src={user_pokemon.image}></img>
              <div className="pokemon_type_list">
              {user_pokemon.types.map((pokemonType, index) => (
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


export default withAuthenticator(UsersPokemon);