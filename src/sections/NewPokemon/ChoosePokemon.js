import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as queries from '../../graphql/queries'
Amplify.configure(awsExports);

function ChoosePokemon() {
    const [pokemons, setPokemons] = useState([])
    const [typeSearch, setTypeSearch] = useState(null)

    useEffect(() => {
        fetchPokemon()
      }, [])
    
      /* 
      
      const pokemonData = await API.graphql({ query: queries.searchPokemons, variables: {filter: {
            types: {
                contains: 'fire'
            }
        }, sort: {
            pokemonId: 'asc'
        },  limit: 900}})
      */
      async function fetchPokemon() {
        try {
            const pokemonData = await API.graphql({ query: queries.listPokemons, variables: {filter: {
                types: {
                    contains: 'fire'
                }
            },  limit: 900}})
          const pokemonitems = pokemonData.data.listPokemons.items
          pokemonitems.sort(function(a, b) {return a.api_id - b.api_id})
          setPokemons(pokemonitems)
        } catch (err) { console.log(err) }
      }
    

    return (
        <div className="pokemon-list-container">
             {
        pokemons.map((pokemon, index) => (
          <div className="pokemon center-div" key={pokemon.id ? pokemon.id : index}>
            <h1>{pokemon.name}</h1>
            <img alt={pokemon.name} src={pokemon.image}></img>
            <h3>{pokemon.types}</h3>
          </div>
        ))
      }
        </div>
    )
}


export default withAuthenticator(ChoosePokemon);