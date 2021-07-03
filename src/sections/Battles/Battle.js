import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import { listSingleTasks } from '../../graphql/queries'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);


function Battle(){

    const [singleTaskData, setSingleTaskData] = useState([])

    let { id } = useParams();
    useEffect(() => {
      
        fetchProblem(id)
      }, [id])


    async function fetchProblem(id) {
        try {
          const singleTask = await API.graphql({query: queries.getSingleTask, variables: {id: id}})
          console.log(singleTask["data"]["getSingleTask"]);
          setSingleTaskData(singleTask["data"]["getSingleTask"]);
        } catch (err) { console.log(err) }
      }


    return(
    <div>
        <h2>Problem: {singleTaskData.question}</h2>
        <h4>Turns Left: {singleTaskData.turns_permitted}</h4>
        <img alt="temp" src={'/src/assets/fire.jpg'}></img>
    </div>
    )
}

export default withAuthenticator(Battle)


