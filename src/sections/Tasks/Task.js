import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import {
  useParams,
  useHistory,
} from "react-router-dom";
import { Auth } from "@aws-amplify/auth"
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);



function Task(){

    const history = useHistory();

    const [postMoveMessage, setPostMoveMessage] = useState('')
    const [selectedPokemon, setSelectedPokemon] = useState()

    const [usersPokemons, setUsersPokemon] = useState([])

    const [singleTaskData, setSingleTaskData] = useState([])
    const [currentHP, setCurrentHP] = useState()
    const [turnsLeft, setTurnsLeft] = useState()
    const [loading, setLoading] = useState(true)
    const [availableMoves, setAvailableMoves] = useState([])
    const [showPartyButton, setShowPartyButton] = useState("Show Party")
    const [partyPokemon, setPartyPokemon] = useState(null)

    const [moveTypeUsed, setMoveTypeUsed] = useState("")

    let { id } = useParams();
    useEffect(() => {
      const fetchProblem = async () => {
        try {
          console.log("test")
          const authUser = await Auth.currentAuthenticatedUser()
            
          const email = await authUser.attributes.email
          

          const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})
          const pokemonIds = userData.data.getAccount.main_pokemon
          console.log(pokemonIds)
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

          var newMoves = []
          var firstPokemon = newPokemons[0]
          for (var move in firstPokemon.movelist) {
            newMoves.push(JSON.parse(firstPokemon.movelist[move]))
          }

          
          
          
          const singleTask = await API.graphql({query: queries.getSingleTask, variables: {id: id}})

          setSingleTaskData(singleTask["data"]["getSingleTask"]);
          setCurrentHP(singleTaskData.total_hp);
          setTurnsLeft(singleTaskData.turns_permitted)
          setLoading(false)
          setAvailableMoves(newMoves)
          setUsersPokemon(newPokemons)
          setSelectedPokemon(firstPokemon)
          
          
          
          

        } catch (err) { console.log(err) }
      }
      console.log(selectedPokemon)
      if (loading){
        fetchProblem()
      }
      
      async function handle_win() {

        for (var key in usersPokemons) {
          let updatedPokemon = usersPokemons[key]

          updatedPokemon.exp_until_level -= singleTaskData.exp_given

          if (updatedPokemon.exp_until_level <= 0) {
            updatedPokemon.level += 1
            updatedPokemon.exp_until_level = updatedPokemon.level  * 10 + updatedPokemon.exp_until_level

          let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + updatedPokemon.pokemon +"/")
          let data = await response.json()
          let moves = data.moves

          for (key in moves) {
            var versions = moves[key].version_group_details
            for (var k in versions) {
              var version = versions[k]
              if (version.move_learn_method.name === "level-up" && version.version_group.name === "ultra-sun-ultra-moon") {
                if (version.level_learned_at === updatedPokemon.level) {
                  console.log(moves[key].move.name)
                  const moveData = await API.graphql({query: queries.listMoves, variables: {filter: {
                    name: {
                      eq: moves[key].move.name
                    }
                  },  limit: 900}});
                  const move = moveData.data.listMoves.items[0]
                  const moveString = JSON.stringify(move)
                  console.log(JSON.parse(JSON.stringify(move)))
                  if (!updatedPokemon.movelist.includes(moveString))
                  updatedPokemon.movelist.push(moveString)
                }
              }
              
            }
              
          }

          }

          const newUpdatedPokemon = {id: updatedPokemon.id ,accountID: updatedPokemon.email, pokemon: updatedPokemon.pokemon, image: updatedPokemon.image, movelist: updatedPokemon.returned_moves, level: updatedPokemon.level, exp_until_level: updatedPokemon.exp_until_level}
          const updatePokemon = await API.graphql(graphqlOperation(mutations.updateUserPokemon, {input: newUpdatedPokemon}))
        
        }

        const authUser = await Auth.currentAuthenticatedUser()
              
        const email = await authUser.attributes.email
        

        const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})
        userData.data.getAccount.money += singleTaskData.reward 
        const oldAccountData = userData.data.getAccount
        const newAccountData = {id: oldAccountData.id, username: oldAccountData.username, users_pokemon: oldAccountData.pokemon_list, main_pokemon: oldAccountData.main_pokemon, money: oldAccountData.money, completed_tasks: oldAccountData.completed_tasks}
        const updateUser = await API.graphql(graphqlOperation(mutations.updateAccount, {input: newAccountData}))


        history.push({
          pathname: "/won_task",
          state: {
            name: singleTaskData.name,
            quote: singleTaskData.win_quote,
            exp_given: singleTaskData.exp_given
          }
        })
      }
  
      function handle_lost() {
        history.push({
          pathname: "/lost_task",
          state: {
            name: singleTaskData.name,
            quote: singleTaskData.lose_quote,
            exp_given: singleTaskData.exp_given
          }
        })
      }

      function check_win() {
        console.log(currentHP <= 0)
        if (currentHP <= 0) {
          handle_win()
          return true
        }
      }

      function check_lose() {
        console.log(turnsLeft)
        if (turnsLeft <= 0) {
          handle_lost()
        }
      }

      if (!check_win()) {
        check_lose()
      }

      
        
      
        
      }, [id, loading, currentHP, turnsLeft, singleTaskData.turns_permitted, singleTaskData.total_hp, usersPokemons, selectedPokemon, history, singleTaskData.exp_given, singleTaskData.lose_quote, singleTaskData.name, singleTaskData.win_quote])


    
    
    

    

    function try_attack(move) {
      
      if (turnsLeft > 1) {
        setMoveTypeUsed(move.type)

        console.log(move.type)
        if (move.type.toLowerCase() === singleTaskData.answer[0].toLowerCase()) {
          setCurrentHP(currentHP - move.power)
          setPostMoveMessage("Your attack was effective and it did " + move.power + " damage!")
        } else {
          setPostMoveMessage("Your attack was not effective, please try again!")
        }

        let type_transition = move.type + "_transition"
        if (document.getElementById("battle_layer").classList.contains(type_transition)) {
          console.log("remove")
          document.getElementById("effect_div").classList.remove("effect_transition")
          document.getElementById("battle_layer").classList.remove(type_transition)
        }

        setTimeout(function() {
          console.log(document)
          document.getElementById("effect_div").classList.add("effect_transition")
          document.getElementById("battle_layer").classList.add(type_transition)
        }, 10)
        // document.getElementById("battle_image").classList.remove("electric_transition")
      }

      setTurnsLeft(turnsLeft - 1)
      
      
     
      
      
    }

    function showParty() {
      if (showPartyButton === "Show Party") {
        document.getElementById("party_div").style.display = "flex"
        setShowPartyButton("Hide Party")
      } else {
        document.getElementById("party_div").style.display = "none"
        setShowPartyButton("Show Party")
      }
    }

    function swapPokemon() {
      if (partyPokemon !== null) {
        console.log(partyPokemon)
        setSelectedPokemon(partyPokemon);
        document.getElementById(partyPokemon.id).style.border = "none"
        document.getElementById(partyPokemon.id).style.cursor = "pointer"
        var newMoves = []
        for (var move in partyPokemon.movelist) {
          newMoves.push(JSON.parse(partyPokemon.movelist[move]))
        }

        setAvailableMoves(newMoves)
        setPartyPokemon(null)
      }
      
    }

    function changeSelectedPokemon(pokemon) {
      if (partyPokemon !== null) {
        document.getElementById(partyPokemon.id).style.border = "none"
        document.getElementById(partyPokemon.id).style.cursor = "pointer"
      } 
      document.getElementById(pokemon.id).style.border = "2px white solid"
      document.getElementById(pokemon.id).style.cursor = "not-allowed"
      setPartyPokemon(pokemon)
    }

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }


    return(
      <div class="battle">
        <div class="problem">
            <h3>Problem: {singleTaskData.question}</h3>
            <h4>Turns Left: {turnsLeft}</h4>
            <div id="battle_div" style={{backgroundImage: 'url(/assets/single_tasks/' + singleTaskData['images']}}>
              <img id="battle_image" class="battle_image" alt={singleTaskData.name} src={'/assets/single_tasks/' + singleTaskData['images']}></img>
              <div id="battle_layer" className={moveTypeUsed + "_layer"}></div>
              <div id="effect_div" className={"effect_div"}>
                <img class="effect_img" alt="Electricity" src={"/assets/move_effects/" + moveTypeUsed + ".png"}></img>
              </div>
            </div>
            <progress id="hp_bar" value={currentHP} max={singleTaskData.total_hp}></progress>
            <div>{currentHP}/{singleTaskData.total_hp}</div>
            <h4>{postMoveMessage}</h4>
        </div>
        
          {selectedPokemon != null ? 
          <div class="user_space">
            <div id="party_div">
              <h3>Your pokemon</h3>
              <div id="user_party">
                {usersPokemons.map((pokemon, key) => (
                  <div id={pokemon.id} onClick={() => changeSelectedPokemon(pokemon)} className={"user_party_item"} key={key}>
                  <div className={pokemon.types[0]}>
                    <img alt={pokemon.name} src={pokemon.image}></img>
                  </div>
                  <p>{pokemon.nickname}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => showParty()}>{showPartyButton}</button>
            <button id="swap_pokemon" onClick={() => swapPokemon()}>Swap Pokemon</button>
            <div class="user_pokemon">
            
            <h3>{selectedPokemon.nickname} </h3>
              <div className={selectedPokemon.types[0]}>
              <img class="user_pokemon_image" alt={selectedPokemon.pokemon} src={selectedPokemon.image}></img>
              </div>
        
              <h3>{toTitleCase(selectedPokemon.pokemon.replace("-", " "))} Lv{selectedPokemon.level}</h3>
            </div>

            <div class="move_div">
                <h3>Moves</h3>
            <div className={selectedPokemon.types[0] + " pokemon_move_list"}>
            {availableMoves.map((move, key) => (
            
              <div class="pokemon_move_list_item_div" onClick={() => try_attack(move)} key={key}><h3 className={"pokemon_move_list_item " + move.type}>{toTitleCase(move.name.replace("-", " "))}</h3></div>
              ))}
            </div>
            </div>
          </div>

           : <div>Test</div>}
            
      </div>
    )
}

export default withAuthenticator(Task)


