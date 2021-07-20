import React, { useState, useEffect } from 'react'
import Amplify, { API, AuthModeStrategyType, graphqlOperation } from 'aws-amplify'
import { createMove, createPokemon, createSingleTask, createType } from '../../graphql/mutations'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { UsernameAlias } from '@aws-amplify/ui-components'
import { Auth } from 'aws-amplify'
import awsExports from "../../aws-exports";
import * as queries from '../../graphql/queries'
import { setState } from 'expect'
Amplify.configure(awsExports);

function IntroduceUser() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        getUsername()
    })
    function getUsername() {
        Auth.currentAuthenticatedUser()
        .then(user => setUsername(user.username))
        .catch(err => console.log(err));
    }
    

    return (
        <div className="center-div">
            <h1>Welcome {username}!</h1>
            <p>My name is Professor ____ and welcome to the world of Real Life!</p>
            <p>In this world you have Pokemon that help you with completing tasks that help the world and yourself. Your goal in this world is to...</p>
            <h3>Have fun!!</h3>
            <p>In the world of Real Life no one in the world can restrict what you are able to do with you and your Pokemon. You can collect all the Pokemon, </p>
            <p>finish all the possible tasks, or raise the highest level Pokemon you possibly can! The possibilities are endless!! (Depending on how good the </p>
            <p>coder of this game is) I hope you enjoy your stay here, for the sake of the players and the career of the creator of the world.</p>
            <p><a href="/">Next</a></p>
        </div>
    )
}

export default withAuthenticator(IntroduceUser);