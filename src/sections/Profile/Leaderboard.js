import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import MoonLoader from "react-spinners/MoonLoader";
import Auth from '@aws-amplify/auth'
Amplify.configure(awsExports);

function Leaderboard() {
    const [mostTasks, setMostTasks] = useState([])
    const [mostPokemon, setMostPokemon] = useState([])
    const [highestPokemon, setHighestPokemon] = useState([])
    const [loadData, setLoadData] = useState(true)

    useEffect(() => {
        if (loadData) {
            fetchData()
          }
        
      }, [loadData])

      async function fetchData() {
        const accountsData = await API.graphql({query: queries.listAccounts})
        const accountsDataList = accountsData.data.listAccounts.items
        const pokemonData = await API.graphql({query: queries.listUserPokemons})
        const pokemonDataList = pokemonData.data.listUserPokemons.items

        accountsDataList.sort(sortMostTasks)
        setMostTasks(accountsDataList.slice(0, 10))

        accountsDataList.sort(sortMostPokemon)
        setMostPokemon(accountsDataList.slice(0, 10))

        console.log(accountsDataList.sort(sortMostPokemon))
        pokemonDataList.sort(sortLevelPokemon)
        setHighestPokemon(pokemonDataList.slice(0, 10))
        setLoadData(false)
    }

    function sortMostTasks(a, b) {
        return b.completed_tasks.length - a.completed_tasks.length
    }

    function sortMostPokemon(a, b) {
        console.log(a.users_pokemon)
        return b.users_pokemon.length - a.users_pokemon.length 
    }

    function sortLevelPokemon(a, b) {
        return b.level - a.level
    }
    
    return (    
    <div className="center-div">
        <h1>Most Tasks Finished</h1>
        <table>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th># of Tasks Finished</th>
            </tr>
         
            {mostTasks.map((data, key) => (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{data.username}</td>
                    <td>{data.completed_tasks.length}</td>
                </tr>
            ))}
        </table>

        <h1>Most Pokemon Owned</h1>
        <table>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th># of Pokemon Owned</th>
            </tr>

            {mostPokemon.map((data, key) => (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{data.username}</td>
                    <td>{data.users_pokemon.length}</td>
                </tr>
            ))}
        </table>

        <h1>Highest Level Pokemon</h1>
        <table>
            <tr>
                <th>Rank</th>
                <th>Nickname</th>
                <th>Pokemon Name</th>
                <th>Level of Pokemon</th>
                <th>Owner</th>
            </tr>
            {highestPokemon.map((data, key) => (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{data.nickname}</td>
                    <td>{data.pokemon}</td>
                    <td>{data.level}</td>
                    <td>{data.accountID}</td>
                    
                </tr>
            ))}
        </table>
    </div>  
    )
}

export default withAuthenticator(Leaderboard);