import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const ListTasks = () => {
  const [singleTasks, setSingleTasks] = useState([])
  const [multiTasks, setMultiTasks] = useState([])
  const history = useHistory();

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
    history.push({
      pathname: "/task/id=" + id,
      })
  }

  function toMulti(id) {
    history.push({
      pathname: "/multi_task/id=" + id,
      })
  }

  console.log("Test")
  return (
      
    <div className="center-div" style={{marginBottom: "20px"}}>
      <h1>Tasks</h1>
      <h1>Single Step Tasks</h1>
      <div className="battle_list">
      {
        singleTasks.map((task, index) => (
          <div className="battle_item center-div" onClick={() => toSingle(task.id)} key={task.id ? task.id : index}>
            <h3>{task.name}</h3>
            <p className="battle_item_text">{task.question}</p>
            <img style={{height: '100px', width: '150px', objectFit: 'cover'}} alt={task.name} src={'/assets/single_tasks/' + task.images + '.jpg'} />
            <p>Exp Given: {task.exp_given}</p>
          </div>
        ))
      }
      </div>
      <h1>Multi Step Tasks</h1>
      <div className="battle_list">
      {
        multiTasks.map((task, index) => (
          <div className="battle_item center-div" onClick={() => toMulti(task.id)} key={task.id ? task.id : index}>
            
            <h3>{task.name}</h3>
            <p className="battle_item_text">{task.question}</p>
            <img style={{height: '100px', width: '150px', objectFit: 'cover'}} alt={task.name} src={'/assets/multi_tasks/' + task.images + '0.jpg'} />
            <p>Exp Given: {task.exp_given}</p>
          </div>
        ))
      }
      </div>
    </div>
  )
}


export default withAuthenticator(ListTasks)