import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom";
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../graphql/queries'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "../aws-exports";
import { Auth } from 'aws-amplify';


function Footer() {

    return (
        <div className="footer">
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Project made by <a href="https://tinluu-website.herokuapp.com">Tin Luu</a></div> 
            <div>Photos from <a href="https://unsplash.com">https://unsplash.com</a></div>
                
        </div>
    )

}




export default withAuthenticator(Footer)