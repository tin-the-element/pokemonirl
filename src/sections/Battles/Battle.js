import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import { listSingleTasks } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);


function Battle(){

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
        
      
        
      }, [id, loading, currentHP, turnsLeft, singleTaskData.turns_permitted, singleTaskData.total_hp])
    
    function try_attack() {
      setCurrentHP(currentHP - 10)
      setTurnsLeft(turnsLeft - 1)
      if (currentHP <= 0) {
        console.log("You Win!")
      }
      if (turnsLeft === 0) {
        console.log("You Lose")
      }
      
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


