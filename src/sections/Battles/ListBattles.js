import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../../graphql/mutations'
import { listSingleTasks } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const App = () => {
  const [singleTasks, setSingleTasks] = useState([])

  useEffect(() => {
    fetchProblems()
  }, [])

  async function fetchProblems() {
    try {
      const singleTaskData = await API.graphql(graphqlOperation(listSingleTasks))
      const singleTasks = singleTaskData.data.listSingleTasks.items
      setSingleTasks(singleTasks)
    } catch (err) { console.log('error fetching todos') }
  }

  return (
    <div style={styles.container}>
      {
        singleTasks.map((task, index) => (
          <div key={task.id ? task.id : index} style={styles.todo}>
            <p style={styles.todoName}>{task.question}</p>
            <p style={styles.todoDescription}>{task.answer}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App)