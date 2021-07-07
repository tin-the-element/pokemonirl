import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createSingleTask } from '../../graphql/mutations'
import { listTodos } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', question: '', images: '', answer: '', total_hp: '', win_quote: '', lose_quote: '', turns_permitted: '', exp_given: '' }

const CreateProblem = () => {
  const [formState, setFormState] = useState(initialState)
  const [singleTasks, setSingleTasks] = useState([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

//   async function fetchTodos() {
//     try {
//       const todoData = await API.graphql(graphqlOperation(listTodos))
//       const todos = todoData.data.listTodos.items
//       setTodos(todos)
//     } catch (err) { console.log('error fetching todos') }
//   }

// name: String!
//   images: [String!]
//   question: String!
//   turns_permitted: Int!
//   exp_given: Int!
//   win_quote: String!
//   lose_quote: String!
//   next_steps: [String]
//   answer: String!
//   total_hp: Int!

  const singleTask = [
    {
      name: 'name',
      text: 'Name'
    },
    {
      name: 'images',
      text: 'Images'
    },
    {
      name: 'question',
      text: 'Question'
    },
    {
      name: 'turns_permitted',
      text: 'Turns Permitted'
    },
    {
      name: 'exp_given',
      text: 'Exp Given'
    },
    {
      name: 'win_quote',
      text: 'Win Quote'
    },
    {
      name: 'lose_quote',
      text: 'NamLose Quotee'
    },
    {
      name: 'answer',
      text: 'Answer'
    },
    {
      name: 'total_hp',
      text: 'Total HP'
    }
  ]


  async function addSingleTask() {
    try {
      
      
      // if (!formState.name || !formState.question || !formState.image || !formState.answer || !formState.total_hp || !formState.turns_permitted || !formState.exp_given) return
      const singleTask = { ...formState }
      console.log(!formState["name"] || !formState.question || !formState.images || !formState.answer || !formState.total_hp || !formState.turns_permitted || !formState.exp_given)
      setSingleTasks([...singleTasks, singleTask])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createSingleTask, {input: singleTask}))
      console.log("success")
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
/* 
question
      answer
      total_hp
      turns_permitted
      exp_given
*/
  return (
    <div style={styles.container}>
      <h2>Create Problem</h2>
      {
        singleTask.map((object, index) => {
          return (
            <input
              key={object.id ? object.id : index}
              onChange={event => setInput(object.name, event.target.value)}
              style={styles.input}
              value={formState[object.name]}
              placeholder={object.text}
            />
          )
        })
      }
      <button style={styles.button} onClick={addSingleTask}>Create Todo</button>
      {/* {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      } */}
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

export default withAuthenticator(CreateProblem)