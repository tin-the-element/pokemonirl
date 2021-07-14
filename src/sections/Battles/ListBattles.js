import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listSingleTasks } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const ListBattles = () => {
  const [singleTasks, setSingleTasks] = useState([])

  useEffect(() => {
      
    fetchProblems()
  }, [])

  async function fetchProblems() {
    try {
      const singleTaskData = await API.graphql(graphqlOperation(listSingleTasks))
      console.log(singleTaskData);
      const singleTasks = singleTaskData.data.listSingleTasks.items
      setSingleTasks(singleTasks)
    } catch (err) { console.log(err) }
  }

  function toBattle(id) {
    window.location = "/battle/id=" + id ;
  }

  console.log("Test")
  return (
      
    <div className="center-div">
      {
        singleTasks.map((task, index) => (
          <div className="battle_item center-div" onClick={() => toBattle(task.id)} key={task.id ? task.id : index}>
            <h1>{task.name}</h1>
            <p>{task.question}</p>
            <p>Exp Given: {task.exp_given}</p>
            <hr />
          </div>
        ))
      }
    </div>
  )
}


export default withAuthenticator(ListBattles)