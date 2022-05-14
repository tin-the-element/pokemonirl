import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listSingleTasks } from "../../graphql/queries";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

function CompletedPurchase() {
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let location = useLocation();
  return (
    <div class="center-div">
      <h1>
        Congratulations on Adopting {location.state.nickname} for 200 Pokecoins
      </h1>
      <h2>Your new pokemon is a(n) {toTitleCase(location.state.pokemon)}</h2>
      <img alt={location.state.pokemon} src={location.state.image}></img>
      <h2>
        <a href="/list_tasks">Click here to return to the list of problems</a>
      </h2>
    </div>
  );
}

export default withAuthenticator(CompletedPurchase);
