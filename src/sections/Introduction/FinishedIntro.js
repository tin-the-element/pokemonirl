import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import MoonLoader from "react-spinners/MoonLoader";
Amplify.configure(awsExports);

function FinishedIntro() {
  const history = useHistory();

  function to_wiki() {
    history.push({
      pathname: "/wiki",
    });
  }

  function to_list_tasks() {
    history.push({
      pathname: "/list_tasks",
    });
  }

  return (
    <div className="center-div">
      <div className="final_paragraph">
        <h3>
          Sources says here that you have already finished the introduction!
          Please navigate to a different page with the navigation bar or the two
          things below!
        </h3>
      </div>
      <div className="row-div next_step">
        <div onClick={() => to_wiki()} className="next_step_section">
          <h3>Click here for more infomation about the world of PokemonIRL</h3>
        </div>
        <div onClick={() => to_list_tasks()} className="next_step_section">
          <h3>
            Click here or use the navigation bar to start completing tasks!
          </h3>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(FinishedIntro);
