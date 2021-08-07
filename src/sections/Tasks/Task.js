import React, { useEffect, useState } from 'react'
import Amplify, { API} from 'aws-amplify'
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
          var firstPokemon = newPokemons[2]
          for (var move in firstPokemon.movelist) {
            newMoves.push(JSON.parse(firstPokemon.movelist[move]))
          }

          setAvailableMoves(newMoves)
          setUsersPokemon(newPokemons)
          setSelectedPokemon(firstPokemon)
          
          
          const singleTask = await API.graphql({query: queries.getSingleTask, variables: {id: id}})
          setSingleTaskData(singleTask["data"]["getSingleTask"]);
          setCurrentHP(singleTaskData.total_hp);
          setTurnsLeft(singleTaskData.turns_permitted)
          setLoading(false)
          
          
          

        } catch (err) { console.log(err) }
      }
      console.log(selectedPokemon)
      if (loading){
        fetchProblem()
      }
      
      function handle_win() {
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
      console.log(move.type)
      if (move.type.toLowerCase() === singleTaskData.answer[0].toLowerCase()) {
        setCurrentHP(currentHP - move.power)
        setPostMoveMessage("Your attack was effective and it did " + move.power + " damage!")
      } else {
        setPostMoveMessage("Your attack was not effective, please try again!")
      }
      
      
      setTurnsLeft(turnsLeft - 1)
      
      
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
            <img class="battle_image" alt={singleTaskData.name} src={'/assets/single_tasks/' + singleTaskData['images']}></img>
            <progress id="hp_bar" value={currentHP} max={singleTaskData.total_hp}></progress>
            <div>{currentHP}/{singleTaskData.total_hp}</div>
            <h4>{postMoveMessage}</h4>
        </div>
        
          {selectedPokemon != null ? 
          <div class="user_space">
            <div>
              {usersPokemons.map((pokemon, key) => (
                <div key={key}>
                <div className={pokemon.types[0]}>
                  <img alt={pokemon.name} src={pokemon.image}></img>
                </div>
                <p>{pokemon.nickname}</p>
                </div>
              ))}
            </div>
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


