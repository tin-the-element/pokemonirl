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

const initialState = { nickname: ''}

function UsersPokemon() {
    const [formState, setFormState] = useState(initialState)
    const [chosenMainPokemon, setChosenMainPokemon] = useState('')
    const [chosenAllPokemon, setChosenAllPokemon] = useState('')
    const [pokemons, setPokemons] = useState([])
    const [typeSearch, setTypeSearch] = useState('null')
    const [types, setTypes] = useState([])
    const [loadPokemon, setLoadPokemon] = useState(true)
    const [mainPokemon, setMainPokemon] = useState([])
    const [errorMessage, setErrorMessage] = useState("")




    async function fetchUsersPokemon() {
      try {


          const authUser = await Auth.currentAuthenticatedUser()
          
          const email = authUser.attributes.email

          const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})
          const pokemonIds = userData.data.getAccount.users_pokemon
          const mainPokemonIds = userData.data.getAccount.main_pokemon
          var mainPokemons = []
          var newPokemons = []
          

          // var id_filter = []

          // for (var key in pokemonIds) {
          //   id_filter.push({id: {anyofterms: key}})
          // }

          // var main_id_filter = []
          
          // for (var main_key in mainPokemonIds) {
            
          //   main_id_filter.push({id: {anyofterms: main_key}})
          // }

          // console.log(id_filter)
          // console.log(main_id_filter)
          // console.log([{ priority: {eq:1} },
          //   { priority: {eq:2} }])



          // const pokemonData = await API.graphql({ query: queries.listUserPokemons, variables: {filter: {
          //   or: id_filter
          // },  limit: 900}})

          // const mainpokemonData = await API.graphql({ query: queries.listUserPokemons, variables: {filter: {
          //   or: main_id_filter
          // },  limit: 900}})

          // console.log(pokemonData)
          // console.log(mainpokemonData)

          // mainPokemons = mainpokemonData.data.listUserPokemons.items
          // newPokemons = pokemonData.data.listUserPokemons.items

          const pokemonData = await API.graphql({query: queries.listUserPokemons, variables: {filter: {
            accountID: {
              eq: email
            }
          },  limit: 100000000}});

          newPokemons = pokemonData.data.listUserPokemons.items

          for (var key in newPokemons) {
            if (mainPokemonIds.includes(newPokemons[key].id)) {
              mainPokemons.push(newPokemons[key])
            }
          }
          console.log(newPokemons)
          console.log(mainPokemons)

          

        //   console.log(mainPokemons)
        //   console.log(newPokemons)


          setMainPokemon(mainPokemons)
          setPokemons(newPokemons)
          setLoadPokemon(false)
          
          
        
      } catch (err) { console.log(err) }
    }

    useEffect(() => {
        if (loadPokemon) {
            fetchUsersPokemon()
        } 
        
        console.log(mainPokemon)
        console.log(pokemons)

      })

      function mainSelected(pokemon) {
        if (chosenMainPokemon !== '') {
          document.getElementById("Main" + chosenMainPokemon).style.backgroundColor = "initial"
          document.getElementById("Main" + chosenMainPokemon).style.color = "inherit"
        }

        
        setChosenMainPokemon(pokemon)
        document.getElementById("Main" + pokemon).style.backgroundColor = "white"
        document.getElementById("Main" + pokemon).style.color = "black"
          
      }

      function allSelected(pokemon) {
        if (chosenAllPokemon !== '') {
          document.getElementById("All" + chosenAllPokemon).style.backgroundColor = "initial"
          document.getElementById("All" + chosenAllPokemon).style.color = "inherit"
        }
        setChosenAllPokemon(pokemon)
        document.getElementById("All" + pokemon).style.backgroundColor = "white"
        document.getElementById("All" + pokemon).style.color = "black"

      }

      

      async function swapPokemon() {

          if (chosenMainPokemon === '') {
            setErrorMessage("You have not chosen a Main Pokemon to switch out")
            return 
          }

          if (chosenAllPokemon === '') {
            setErrorMessage("You have not chosen a Pokemon to add to your party")
          }
          
          const authUser = await Auth.currentAuthenticatedUser()
          
          
          const email = authUser.attributes.email

          const accountData = await API.graphql({query: queries.getAccount, variables: {id: email}})
          const pokemonIds = accountData.data.getAccount.users_pokemon
          let mainPokemonIds = accountData.data.getAccount.main_pokemon

          if (mainPokemonIds.includes(chosenAllPokemon)) {
            setErrorMessage("This pokemon is already in your party, please try again")
            return
          }

          mainPokemonIds = mainPokemonIds.filter(val => val !== chosenMainPokemon);
          mainPokemonIds.push(chosenAllPokemon)
          const oldAccountData = accountData.data.getAccount

          const newAccountData = {id: oldAccountData.id, username: oldAccountData.username, users_pokemon: pokemonIds, main_pokemon: mainPokemonIds, money: oldAccountData.money, completed_tasks: oldAccountData.completed_tasks}
          await API.graphql(graphqlOperation(mutations.updateAccount, {input: newAccountData}))

          window.location.reload();

      }

      async function removePokemon() {

        if (chosenMainPokemon === '') {
          setErrorMessage("You have not chosen a Main Pokemon to remove out")
          return 
        }
        
        const authUser = await Auth.currentAuthenticatedUser()
        
        
        const email = authUser.attributes.email

        const accountData = await API.graphql({query: queries.getAccount, variables: {id: email}})
        const pokemonIds = accountData.data.getAccount.users_pokemon
        let mainPokemonIds = accountData.data.getAccount.main_pokemon
        mainPokemonIds = mainPokemonIds.filter(val => val !== chosenMainPokemon);

        const oldAccountData = accountData.data.getAccount

        const newAccountData = {id: oldAccountData.id, username: oldAccountData.username, users_pokemon: pokemonIds, main_pokemon: mainPokemonIds, money: oldAccountData.money, completed_tasks: oldAccountData.completed_tasks}
        await API.graphql(graphqlOperation(mutations.updateAccount, {input: newAccountData}))

        window.location.reload();

    }

    async function addPokemon() {

      if (chosenAllPokemon === '') {
        setErrorMessage("You have not chosen a Pokemon to add")
        return 
      }
      
      const authUser = await Auth.currentAuthenticatedUser()
      
      
      const email = authUser.attributes.email

      const accountData = await API.graphql({query: queries.getAccount, variables: {id: email}})
      const pokemonIds = accountData.data.getAccount.users_pokemon
      const mainPokemonIds = accountData.data.getAccount.main_pokemon

      if (mainPokemonIds.includes(chosenAllPokemon)) {
        setErrorMessage("This pokemon is already in your party, please try again")
        return
      }

      if (mainPokemonIds.length > 18) {
        setErrorMessage("There are too many pokemon in your party, please choose one to swap")
        return
      }
      mainPokemonIds.push(chosenAllPokemon)

      const oldAccountData = accountData.data.getAccount

      const newAccountData = {id: oldAccountData.id, username: oldAccountData.username, users_pokemon: pokemonIds, main_pokemon: mainPokemonIds, money: oldAccountData.money, completed_tasks: oldAccountData.completed_tasks}
      await API.graphql(graphqlOperation(mutations.updateAccount, {input: newAccountData}))
      
      
      window.location.reload();

  }
      

      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    

    return (
      <div className="center-div">
          {mainPokemon.length === 0 || pokemons.length === 0 ? <MoonLoader color={"white"} loading={"true"} size={150} /> :
          <div className="center-div">
           <div className="pokemon_title_div"> <h1>Your Pokemon</h1></div>
          <h1>Main Pokemon</h1>
          <div className="pokemon-list-container">
              {
          mainPokemon.map((user_pokemon, index) => (
            <div id={"Main" + user_pokemon.id} onClick={() => mainSelected(user_pokemon.id)} className="pokemon center-div" key={user_pokemon.id ? user_pokemon.id : index}>
              <h1 style={{marginBottom: '0px'}}>{user_pokemon.nickname}</h1>
              <h3>{toTitleCase(user_pokemon.pokemon.replace("-", " "))}</h3>
              <img alt={user_pokemon.pokemon.replace("-", " ")} src={user_pokemon.image}></img>
              <h3 style={{marginTop: '0px'}}>Lv {user_pokemon.level} </h3>
              <div className="pokemon_type_list">
              {user_pokemon.types.map((pokemonType, index) => (
                <h3 className={"pokemon_type_list_item " + pokemonType} key={pokemonType.id ? pokemonType.id : index}>{pokemonType}</h3>
              ))}
              </div>
              
              
            </div>
          ))
        }
          </div>
          <div>
            <button onClick={() => swapPokemon()}>Swap Pokemon</button>
            <button onClick={() => addPokemon()}>Add to Main Pokemon</button>
            <button onClick={() => removePokemon()}>Remove from Main Pokemon</button>
            <h3>{errorMessage}</h3>
          </div>
          <h1>All Pokemon</h1>
          <div className="pokemon-list-container">
              {
          pokemons.map((user_pokemon, index) => (
            <div id={"All" + user_pokemon.id} onClick={() => allSelected(user_pokemon.id)}className="pokemon center-div" key={user_pokemon.id ? user_pokemon.id : index}>
              <h1 style={{marginBottom: '0px'}}>{user_pokemon.nickname}</h1>
              <h3>{toTitleCase(user_pokemon.pokemon.replace("-", " "))}</h3>
              <img alt={user_pokemon.pokemon.replace("-", " ")} src={user_pokemon.image}></img>
              <h3 style={{marginTop: '0px'}}>Lv {user_pokemon.level} </h3>
              <div className="pokemon_type_list">
              {user_pokemon.types.map((pokemonType, index) => (
                <h3 className={"pokemon_type_list_item " + pokemonType} key={pokemonType.id ? pokemonType.id : index}>{pokemonType}</h3>
              ))}
              </div>
              
              
            </div>
          ))
        }
          </div> </div> }
        </div>
    )
}


export default withAuthenticator(UsersPokemon);