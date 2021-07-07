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
    const [loading, setLoading] = useState(true)

    let { id } = useParams();
    useEffect(() => {
        fetchProblem(id)
        update()
      }, [id])

    function update() {
    
      setCurrentHP(singleTaskData.total_hp)
      console.log(singleTaskData.total_hp)
    }


    async function fetchProblem(id) {
        try {
          const singleTask = await API.graphql({query: queries.getSingleTask, variables: {id: id}})
          console.log(singleTask["data"]["getSingleTask"]);
          setSingleTaskData(singleTask["data"]["getSingleTask"]);
          setCurrentHP(singleTaskData.total_hp);
          

        } catch (err) { console.log(err) } finally {
          setLoading(false)
        }
      }
    
    function do_damage() {
      setCurrentHP(currentHP - 10)
    }



    return(
      <div class="battle">
        <div class="problem">
            <h2>Problem: {singleTaskData.question}</h2>
            <h4>Turns Left: {singleTaskData.turns_permitted}</h4>

            
            <img class="battle_image" alt={singleTaskData.name} src={'/assets/single_tasks/' + singleTaskData['images']}></img>
            <progress id="hp_bar" value={currentHP} max={singleTaskData.total_hp}></progress>
            <div>{currentHP}/{singleTaskData.total_hp}</div>
        </div>
        <div class="user_space">
            <button onClick={do_damage}>Water Gun</button>
        </div>
    </div>
    )
}

export default withAuthenticator(Battle)


