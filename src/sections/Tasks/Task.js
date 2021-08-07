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

          var newMoves = []
          for (var move in newPokemons[0].movelist) {
            newMoves.push(JSON.parse(newPokemons[0].movelist[move]))
          }

          setAvailableMoves(newMoves)
          setUsersPokemon(newPokemons)
          setSelectedPokemon(newPokemons[0])
          
          
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


    
    
    

    

    function try_attack() {
      console.log(currentHP)
      setCurrentHP(currentHP - 10)
      
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
        </div>
        
          {selectedPokemon != null ? 
          <div class="user_space">
            <div class="user_pokemon">
            <h3>{selectedPokemon.nickname} </h3>
              <div className={selectedPokemon.types}>
              <img class="user_pokemon_image" alt={selectedPokemon.pokemon} src={selectedPokemon.image}></img>
              </div>
        
              <h3>{toTitleCase(selectedPokemon.pokemon.replace("-", " "))} Lv{selectedPokemon.level}</h3>
            </div>

            <div class="move_div">
                <h3>Moves</h3>
            <div class="pokemon_move_list">
            {availableMoves.map((move, key) => (
            
              <div key={key}><h3 className={"pokemon_move_list_item " + move.type}>{toTitleCase(move.name.replace("-", " "))}</h3></div>
              ))}
            </div>
            </div>
          </div>

           : <div>Test</div>}
            
      </div>
    )
}

export default withAuthenticator(Task)


