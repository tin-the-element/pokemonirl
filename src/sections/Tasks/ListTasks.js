import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const ListTasks = () => {
  const [singleTasks, setSingleTasks] = useState([])
  const [multiTasks, setMultiTasks] = useState([])

  useEffect(() => {
      
    fetchProblems()
  }, [])

  async function fetchProblems() {
    try {
      const singleTaskData = await API.graphql(graphqlOperation(queries.listSingleTasks))
      console.log(singleTaskData);
      const singleTasks = singleTaskData.data.listSingleTasks.items

      const multiTaskData = await API.graphql(graphqlOperation(queries.listMultipleTasks))
      const multiTasks = multiTaskData.data.listMultipleTasks.items
      setSingleTasks(singleTasks)
      setMultiTasks(multiTasks)
    } catch (err) { console.log(err) }
  }

  function toSingle(id) {
    window.location = "/task/id=" + id ;
  }

  function toMulti(id) {
    console.log("test");

    window.location = "/multi_task/id=" + id ;
  }

  console.log("Test")
  return (
      
    <div className="center-div">
      <h1>Single Step Tasks</h1>
      {
        singleTasks.map((task, index) => (
          <div className="battle_item center-div" onClick={() => toSingle(task.id)} key={task.id ? task.id : index}>
            
            <h3>{task.name}</h3>
            <p>{task.question}</p>
            <p>Exp Given: {task.exp_given}</p>
            <hr width="400" />
          </div>
        ))
      }
      <h1>Multi Step Tasks</h1>
      {
        multiTasks.map((task, index) => (
          <div className="battle_item center-div" onClick={() => toMulti(task.id)} key={task.id ? task.id : index}>
            
            <h3>{task.name}</h3>
            <p>{task.question}</p>
            <p>Exp Given: {task.exp_given}</p>
            <hr width="400" />
          </div>
        ))
      }
    </div>
  )
}


export default withAuthenticator(ListTasks)