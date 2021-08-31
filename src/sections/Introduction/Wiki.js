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

function Wiki() {
    
    return (
        <div>
            <h1>Wiki: Will be done soon!</h1>
        </div>
    )
}

export default withAuthenticator(Wiki);
