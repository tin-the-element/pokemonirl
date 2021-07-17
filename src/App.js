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
import CreateProblem from './sections/admin/CreateProblem.js'
import ListBattles from './sections/Battles/ListBattles.js'

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";
import Battle from './sections/Battles/Battle';
import WonBattle from './sections/Battles/WonBattle'
import LostBattle from './sections/Battles/LostBattle'
import MakeAPICalls from './sections/admin/MakeAPICalls'
import ChoosePokemon from './sections/NewPokemon/ChoosePokemon';

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
        <Route path="/list_battles">
          <ListBattles />
        </Route>
        <Route path="/won_battle">
          <WonBattle />
        </Route>
        <Route path="/lost_battle">
          <LostBattle />
        </Route>
        <Route path="/make_calls" >
          <MakeAPICalls />
        </Route>
        <Route path="/choose_pokemon" >
          <ChoosePokemon />
        </Route>

        <Switch>
          <Route path="/battle/id=:id" children={<Battle />} />
        </Switch>
      </Switch>
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

