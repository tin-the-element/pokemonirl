import React, { useEffect } from 'react'
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
        ? <div><h1 style={{textAlign: 'center'}}>{location.state.quote}</h1><h3>Congrats you have solved: {location.state.name}! All of the Pokemon in your Party have gained {location.state.exp_given}xp!</h3></div>
        : <h2>Oops! Something has gone wrong</h2>}
        
        <h3><a href="/list_tasks">Click here</a> to return to the list of problems</h3>
      </div>
    )
}


export default withAuthenticator(WonTask)