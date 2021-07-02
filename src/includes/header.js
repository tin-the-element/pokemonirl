import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";
import Amplify, { API, graphqlOperation } from 'aws-amplify'

import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const Header = () => {
  

  return (
    <div style={styles.container}>
      <nav>
        <ul>
          <li>
            <Link to="/list_battles">List Battles</Link>
          </li>
          <li>
            <Link to="/create_problem">Create Problem</Link>
          </li>
        </ul>
      </nav>
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

export default withAuthenticator(Header)
