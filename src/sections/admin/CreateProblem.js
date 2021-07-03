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

const initialState = { name: '', question: '', image: '', answer: '', total_hp: '', turns_permitted: '', exp_given: '' }

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


  async function addSingleTask() {
    try {
      if (!formState.name || !formState.question || !formState.image || !formState.answer || !formState.total_hp || !formState.turns_permitted || !formState.exp_given) return
      const singleTask = { ...formState }
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
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('question', event.target.value)}
        style={styles.input}
        value={formState.question}
        placeholder="Question"
      />
      <input
        onChange={event => setInput('image', event.target.value)}
        style={styles.input}
        value={formState.image}
        placeholder="Image"
      />
      <input
        onChange={event => setInput('answer', event.target.value)}
        style={styles.input}
        value={formState.answer}
        placeholder="Answer"
      />
      <input
        onChange={event => setInput('total_hp', event.target.value)}
        style={styles.input}
        value={formState.total_hp}
        placeholder="Total HP"
      />
      <input
        onChange={event => setInput('turns_permitted', event.target.value)}
        style={styles.input}
        value={formState.turns_permitted}
        placeholder="Turns Permitted"
      />
      <input
        onChange={event => setInput('exp_given', event.target.value)}
        style={styles.input}
        value={formState.exp_given}
        placeholder="Exp Given"
      />
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