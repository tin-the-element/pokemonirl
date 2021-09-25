import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
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
import RiddleTask from './sections/Tasks/RiddleTask';
import WonTask from './sections/Tasks/WonTask'
import LostTask from './sections/Tasks/LostTask'
import MakeAPICalls from './sections/admin/MakeAPICalls'
import ChoosePokemon from './sections/NewPokemon/ChoosePokemon';
import IntroduceUser from './sections/Introduction/IntroduceUser';
import UsersPokemon from './sections/Profile/UsersPokemon';
import Store from './sections/NewPokemon/Store'
import CompletedPurchase from './sections/NewPokemon/CompletedPurchase'
import FirstPokemon from './sections/Introduction/FirstPokemon'
import FinalIntroduction from './sections/Introduction/FinalIntroduction'
import FinishedIntro from './sections/Introduction/FinishedIntro'
import * as mutations from './graphql/mutations'
import * as queries from './graphql/queries'
import Wiki from './sections/Introduction/Wiki'
import Auth from '@aws-amplify/auth'
import Leaderboard from './sections/Profile/Leaderboard';
import CreateRiddle from './sections/admin/CreateRiddle';

Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {

  const [finishedTutorial, setFinishedTutorial] = useState(false)
  const [notFinishedTutorial, setNotFinishedTutorial] = useState(true)
  const [checkFT, setCheckFT] = useState(true)

  useEffect(() => {
    if (checkFT) {
      
      checkIntro()
    }
    
  })
  async function  checkIntro() {

    const authUser = await Auth.currentAuthenticatedUser()
            
    const email = await authUser.attributes.email
  
    const userData = await API.graphql({query: queries.getAccount, variables: {id: email}})

    if (userData.data.getAccount == null) {
      setNotFinishedTutorial(false)
      return
    }

    console.log('loop')

    setCheckFT(false)
    const bool = userData.data.getAccount.finished_tutorial
    if (bool) {
      setFinishedTutorial(bool)
    } else {
      setNotFinishedTutorial(bool)
    }
    
    console.log(finishedTutorial)
  }

  const links_obj = 
  [
    {link: '/create_problem', component: <CreateProblem />},
    {link: '/create_multi', component: <CreateMulti />},
    {link: '/create_riddle', component: <CreateRiddle />},
    {link: '/list_tasks', component: <ListTasks />},
    {link: '/won_task', component: <WonTask />},
    {link: '/lost_task', component: <LostTask />},
    {link: '/make_calls', component: <MakeAPICalls />},
    {link: '/choose_pokemon', component: <ChoosePokemon />},
    {link: '/user_pokemon', component: <UsersPokemon />},
    {link: '/store', component: <Store />},
    {link: '/completed_purchase', component: <CompletedPurchase />},
    {link: '/finished_intro', component: <FinishedIntro />},
    {link: '/wiki', component: <Wiki />},
    {link: '/leaderboard', component: <Leaderboard />}
    // {link: '/make_calls', component:<MakeAPICalls/>}
  ]

  return (
    <Router>
      <Header />
      <Switch>
        

        <Route path="/introduction" >
        {finishedTutorial ? <Redirect to="/finished_intro" /> : <IntroduceUser />}
        </Route>
        <Route path="/first_pokemon">
          {finishedTutorial ? <Redirect to="/finished_intro" /> : <FirstPokemon />}
        </Route>
        <Route path="/final_introduction">
          {finishedTutorial ? <Redirect to="/finished_intro" /> : <FinalIntroduction />}
        </Route>

        {links_obj.map((link_obj, key) => (
          <Route path={link_obj.link}>
            {notFinishedTutorial ? link_obj.component: <Redirect to="/introduction" /> }
          </Route>
        ))}
       
        <Switch>

          <Route path="/task/id=:id">
            {notFinishedTutorial ? <Task />: <Redirect to="/introduction" /> }
          </Route>
          <Route path="/multi_task/id=:id">
            {notFinishedTutorial ? <MultiTask />: <Redirect to="/introduction" /> }
          </Route>
          <Route path="/riddle_task/id=:id">
            {notFinishedTutorial ? <RiddleTask />: <Redirect to="/introduction" /> }
          </Route>
          <Route
                path="/"
                render={() => {
                    return (
                      <Redirect to="/list_tasks" /> 
                    )
                }}
              />
          
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

