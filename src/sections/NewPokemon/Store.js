import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { useParams, useHistory } from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import MoonLoader from "react-spinners/MoonLoader";

function Store() {
  const store_items = [
    {
      name: "Adopt a new pokemon!",
      description: "Take a trip to Pokeco to adopt a new pokemon!",
      cost: 200,
      function: () => buypokemon(),
    },
  ];

  const history = useHistory();
  const [money, setMoney] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      getUserData();
    }
  });

  async function getUserData() {
    const authUser = await Auth.currentAuthenticatedUser();
    const email = await authUser.attributes.email;
    const userData = await API.graphql({
      query: queries.getAccount,
      variables: { id: email },
    });
    setMoney(userData.data.getAccount.money);
    setLoading(false);
  }

  function buypokemon() {
    history.push({
      pathname: "/choose_pokemon",
    });
  }

  return (
    <div class="store">
      <div className="store_title_div">
        <h1>PokeSmart</h1>
      </div>
      {loading ? <div></div> : <h3>You have: {money} Pokecoins</h3>}

      <div class="store_section">
        {store_items.map((item, key) => {
          return (
            <div class="store_item center-div" key={key}>
              <h2>{item.name}</h2>
              <h4 style={{ textAlign: "center" }}>{item.description}</h4>
              <h4>{item.cost} Pokecoins</h4>
              {item.cost > money ? (
                <button
                  onClick={item.function}
                  style={{ marginBottom: "" }}
                  disabled
                >
                  Buy
                </button>
              ) : (
                <button onClick={item.function} style={{ marginBottom: "" }}>
                  Buy
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withAuthenticator(Store);
