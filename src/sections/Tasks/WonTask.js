import React from 'react'
import Amplify from 'aws-amplify'
import {
  useParams,
  useLocation
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

function WonTask() {
    let location = useLocation()

    return (
      <div class="center-div">
        {location.state != null
        ? <div><h2>{location.state.quote}</h2><h4>Congrats you have solved: {location.state.name}! All of your Pokemon have gained {location.state.exp_given}xp!</h4></div>
        : <h2>Oops! Something has gone wrong</h2>}
        
        <h4><a href="/list_tasks">Click here</a> to return to the list of problems</h4>
      </div>
    )
}


export default withAuthenticator(WonTask)