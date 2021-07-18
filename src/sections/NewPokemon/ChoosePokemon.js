import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as queries from '../../graphql/queries'
Amplify.configure(awsExports);

function ChoosePokemon() {
    const [pokemons, setPokemons] = useState([])
    const [typeSearch, setTypeSearch] = useState('null')
    const [types, setTypes] = useState([])
    const [loadPokemon, setLoadPokemon] = useState(true)

    useEffect(() => {
        if (loadPokemon) {
          fetchPokemon()
          fetchTypes()
        }
        
        console.log('change')
      })
    
      /* 
      
      const pokemonData = await API.graphql({ query: queries.searchPokemons, variables: {filter: {
            types: {
                contains: 'fire'
            }
        }, sort: {
            pokemonId: 'asc'
        },  limit: 900}})
      */
      async function fetchTypes() {
        try {
          const typeData = await API.graphql({query: queries.listTypes})
          const sortTypes = typeData.data.listTypes.items.sort(function(a, b){return a.api_id - b.api_id})
          console.log(sortTypes)
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
              console.log(pokemonitems )
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
        console.log(type) 
        setTypeSearch(type)
        setLoadPokemon(true)
        return false
      }

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    

    return (
      <div className="center-div">
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
            <div className="pokemon center-div" key={pokemon.id ? pokemon.id : index}>
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