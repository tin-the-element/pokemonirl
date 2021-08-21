import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Header from './includes/header.js'
import Footer from './includes/footer.js'
import CreateProblem from './sections/admin/CreateProblem.js'
import CreateMulti from './sections/admin/CreateMulti'
import ListTasks from './sections/Tasks/ListTasks.js'

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
import Task from './sections/Tasks/Task';
import MultiTask from './sections/Tasks/MultiTask';
import WonTask from './sections/Tasks/WonTask'
import LostTask from './sections/Tasks/LostTask'
import MakeAPICalls from './sections/admin/MakeAPICalls'
import ChoosePokemon from './sections/NewPokemon/ChoosePokemon';
import IntroduceUser from './sections/Introduction/IntroduceUser';
import UsersPokemon from './sections/Profile/UsersPokemon';
import Store from './sections/NewPokemon/Store'

Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/create_problem">
          <CreateProblem />
        </Route>
        <Route path="/create_multi">
          <CreateMulti />
        </Route>
        <Route path="/list_tasks">
          <ListTasks />
        </Route>
        <Route path="/won_task">
          <WonTask />
        </Route>
        <Route path="/lost_task">
          <LostTask />
        </Route>
        <Route path="/make_calls" >
          <MakeAPICalls />
        </Route>
        <Route path="/choose_pokemon" >
          <ChoosePokemon />
        </Route>
        <Route path="/introduction" >
          <IntroduceUser />
        </Route>
        <Route path="/user_pokemon" >
          <UsersPokemon />
        </Route>
        <Route path="/store" >
          <Store />
        </Route>
        <Switch>
          <Route path="/task/id=:id" children={<Task />} />
          <Route path="/multi_task/id=:id" children={<MultiTask />} />
        </Switch>
      </Switch>
      <Footer />
    </Router>
  )
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
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

