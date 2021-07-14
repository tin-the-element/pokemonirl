import React, { useEffect, useState } from 'react'
import Amplify, { API} from 'aws-amplify'
import * as queries from '../../graphql/queries'
import {
  useParams,
  useHistory,
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);


function Battle(){

    const history = useHistory();

    const [singleTaskData, setSingleTaskData] = useState([])
    const [currentHP, setCurrentHP] = useState()
    const [turnsLeft, setTurnsLeft] = useState()
    const [loading, setLoading] = useState(true)

    let { id } = useParams();
    useEffect(() => {
      const fetchProblem = async () => {
        try {
          
          const singleTask = await API.graphql({query: queries.getSingleTask, variables: {id: id}})
          console.log(singleTask["data"]["getSingleTask"]);
          console.log(currentHP);
          await setSingleTaskData(singleTask["data"]["getSingleTask"]);
          await setCurrentHP(singleTaskData.total_hp);
          setCurrentHP(singleTaskData.total_hp);
          setTurnsLeft(singleTaskData.turns_permitted)
          setLoading(false)
          
          

        } catch (err) { console.log(err) }
      }
      console.log("Load useEffect")
      if (loading){
        fetchProblem()
      }

      if (!check_win()) {
        check_lose()
      }
      
        
      
        
      }, [id, loading, currentHP, turnsLeft, singleTaskData.turns_permitted, singleTaskData.total_hp])


    function handle_win() {
      history.push({
        pathname: "/won_battle",
        state: {
          name: singleTaskData.name,
          quote: singleTaskData.win_quote,
          exp_given: singleTaskData.exp_given
        }
      })
    }

    function handle_lost() {
      history.push({
        pathname: "/lost_battle",
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

    function try_attack() {
      console.log(currentHP)
      setCurrentHP(currentHP - 10)
      
      setTurnsLeft(turnsLeft - 1)
      
      
    }



    return(
      <div class="battle">
        <div class="problem">
            <h2>Problem: {singleTaskData.question}</h2>
            <h4>Turns Left: {turnsLeft}</h4>

            
            <img class="battle_image" alt={singleTaskData.name} src={'/assets/single_tasks/' + singleTaskData['images']}></img>
            <progress id="hp_bar" value={currentHP} max={singleTaskData.total_hp}></progress>
            <div>{currentHP}/{singleTaskData.total_hp}</div>
        </div>
        <div class="user_space">
            <button onClick={try_attack}>Water Gun</button>
        </div>
    </div>
    )
}

export default withAuthenticator(Battle)


