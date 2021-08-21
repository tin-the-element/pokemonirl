
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

const store_items = [
    {
        name: "Adopt a new pokemon!",
        description: "Take a trip to Pokeco to adopt a new pokemon!",
        cost: 200
    }
]

function Store() {





    return (
        <div class="store">
            <h1>Mart</h1>
            <div class="store_section">
                {store_items.map((item, key) => {
                    return (<div class="store_item center-div" key={key}>
                        <h2>{item.name}</h2>
                        <h4>{item.description}</h4>
                        <h4>{item.cost} Pokecoins</h4>
                        <button>Buy</button>
                    </div>)
                })

                }
            </div>
        </div>
    )
}

export default withAuthenticator(Store)