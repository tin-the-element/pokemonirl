import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import * as queries from '../../graphql/queries'
import {
  useParams,
  useHistory,
} from "react-router-dom";
import { Auth } from "@aws-amplify/auth"
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import MoonLoader from "react-spinners/MoonLoader";
Amplify.configure(awsExports);



function FinalIntroduction(){
  const history = useHistory()

  function to_wiki() {
    window.location.href = '/wiki'
  }   

  function to_list_tasks() {
    window.location.href = '/list_tasks'
  }   

  return (
    <div className="center-div">
      <h1>Congrats on finishing the basic Introduction!</h1> 
      <div className="final_paragraph">
        <h3>
        Like the real world, we won't show you how to do correctly do stuff, however, we will give you a lot of
        information to help you while you play the game along with it!
      </h3>
      <p>Mini hint: Do the bird task first</p>
      </div>
      <div className="row-div next_step">
        <div onClick={() =>  to_wiki() }className="next_step_section">
          <h3>Click here for more infomation about the world of PokemonIRL</h3>
        </div>
        <div onClick={() => to_list_tasks() } className="next_step_section">
          <h3>Click here or use the navigation bar to start completing tasks!</h3>
        </div>
      </div>
    </div>
  )
}

export default withAuthenticator(FinalIntroduction)