import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listSingleTasks } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

function LostBattle() {
    let location = useLocation()
    console.log(location.state.name)
    return (
      <div class="center-div">
        <h1>{location.state.quote}</h1>
        <h2>Sorry, you have failed to Solve: {location.state.name}. You have lost {location.state.exp_given} gold.</h2>
        <h2><a href="/list_problems">Click here to return to the list of problems</a></h2>
      </div>
    )
}

export default withAuthenticator(LostBattle)