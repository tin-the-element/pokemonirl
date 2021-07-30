import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../../aws-exports";
import * as queries from '../../graphql/queries'
import * as mutations from '../../graphql/mutations'
import Auth from '@aws-amplify/auth'
Amplify.configure(awsExports);
// import React, { useState, useEffect } from 'react'
// // import Amplify, { API, graphqlOperation } from 'aws-amplify'
// // import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
// import { withAuthenticator } from '@aws-amplify/ui-react'
// import awsExports from "../../aws-exports";
// import * as queries from '../../graphql/queries'
// Amplify.configure(awsExports);

function IntroduceUser() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        getUsername()
    })
    function getUsername() {

        Auth.currentAuthenticatedUser()
        .then(user => setUsername(user.username))
        .catch(err => console.log(err));
    }

    async function addAccount() {
        Auth.currentAuthenticatedUser()
        .then(user => setEmail(user.attributes.email))
        .catch(err => console.log(err));
        console.log(email)
        const accountData = await API.graphql(graphqlOperation(mutations.createAccount, {input: {id: email, username: username, users_pokemon: [] ,money: 100, completed_tasks: []}}))
        console.log(accountData)
    }
    

    return (
        <div className="center-div">
            <h1>Welcome {username}! </h1>
            <p>My name is Professor ____ and welcome to the world of Real Life!</p>
            <p>In this world you have Pokemon that help you with completing tasks that help the world and yourself. Your goal in this world is to...</p>
            <h3>Have fun!!</h3>
            <p>In the world of Real Life no one in the world can restrict what you are able to do with you and your Pokemon. You can collect all the Pokemon, </p>
            <p>finish all the possible tasks, or raise the highest level Pokemon you possibly can! The possibilities are endless!! (Depending on how good the </p>
            <p>coder of this game is) I hope you enjoy your stay here, for the sake of the players and the career of the creator of the world.</p>
            <button onClick={addAccount}>Add account</button>
            <p><a href="/choose_pokemon">Choose Your First Pokemon!</a></p>
        </div>
    )
}

export default withAuthenticator(IntroduceUser);
