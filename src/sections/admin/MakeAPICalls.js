import React, { useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as queries from '../../graphql/queries'
Amplify.configure(awsExports);

function MakeAPICalls() {

    function load_types() {
        fetch("https://pokeapi.co/api/v2/type/")
        .then(res => res.json())
        .then((result) => {
            var types = result.results
            for (var key in types) {
                console.log(types[key])
                console.log(key)
                if (key < 18) {
                    var pokemon_type = {api_id: parseInt(key) + 1, name: types[key].name, api: types[key].url}
                    console.log(pokemon_type)
                    API.graphql(graphqlOperation(createType, {input: pokemon_type}))
                }
                
            }
        },
        (error) => {
            console.log(console.error())
            
        }
        )
    }

    function load_pokemon() {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=1118")
        .then(res => res.json())
        .then((result) => {
            var pokemon = result.results
            for (var key in pokemon) {
                add_pokemon(pokemon[key].url)
            }
        },
        (error) => {
            console.log(error)
        }
        )
    }

    /* 
    id
      name
      type
      image
      api
    */

    function add_pokemon(link) {
        fetch(link)
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            var pokemon_object = {id: result.id, name: result.name, type: result.types}
            API.graphql(graphqlOperation(createPokemon, {input: pokemon_object}))
        },
        (error) => {
            console.log(error)
        }
        )

    }

    function load_moves() {
        fetch("https://pokeapi.co/api/v2/move/?limit=844")
        .then(res => res.json())
        .then((result) => {
            var moves = result.results
            for (var key in moves) {
                add_moves(key + 1, moves[key].url)
            }
        },
        (error) => {
            console.log(error)
        }
        )
    }

    /*
        type Move @model {
        id: ID!
        api_id: Int!
        name: String!
        type: Type!
        power: Int!
        api: String!
        }
    */
    function add_moves(id, link) {
        fetch(link)
        .then(res => res.json())
        .then((result) => {
            console.log(result)
            var move_result = result
            var move_type = API.graphql({ query: queries.getType, variables: {api_id: 3}})
            console.log(move_type)
            // var move_object = {api_id: id, name: move_result.name, type: move_result.type, power: move_result.power, api: link}
            // API.graphql(graphqlOperation(createMove, {input: move_object}))

        },
        (error) => {
            console.log(error)
        }
        )
    }

    return (
        <div>
            <button onClick={load_pokemon}>Load Pokemon</button>
        <button onClick={load_types}>Load Types</button>
        <button onClick={load_moves}>Load Moves</button>
        </div>
    )
}

export default withAuthenticator(MakeAPICalls);