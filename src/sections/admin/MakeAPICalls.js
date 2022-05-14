import React, { useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  createMove,
  createPokemon,
  createSingleTask,
  createType,
  updateUserPokemon,
} from "../../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import * as queries from "../../graphql/queries";
Amplify.configure(awsExports);

function MakeAPICalls() {
  function load_types() {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((res) => res.json())
      .then(
        (result) => {
          var types = result.results;
          for (var key in types) {
            if (key < 18) {
              var pokemon_type = {
                api_id: parseInt(key) + 1,
                name: types[key].name,
                api: types[key].url,
              };
              API.graphql(
                graphqlOperation(createType, { input: pokemon_type })
              );
            }
          }
        },
        (error) => {
          console.log(console.error());
        }
      );
  }

  function load_pokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=898")
      .then((res) => res.json())
      .then(
        (result) => {
          var pokemon = result.results;
          for (var key in pokemon) {
            add_pokemon(pokemon[key].url);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /* 
   type Pokemon @model {
            api_id: Int!
            name: String!
            types: [String]! 
            image: String!
            api: String!
            }
    */

  function add_pokemon(link) {
    fetch(link)
      .then((res) => res.json())
      .then(
        (result) => {
          var pokemon_types = [];
          for (var key in result.types) {
            pokemon_types.push(result.types[key].type.name);
          }
          var pokemon_object = {
            api_id: result.id,
            name: result.name,
            types: pokemon_types,
            image: result.sprites.front_default,
            api: link,
          };
          API.graphql(
            graphqlOperation(createPokemon, { input: pokemon_object })
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function load_moves() {
    fetch("https://pokeapi.co/api/v2/move/?limit=826")
      .then((res) => res.json())
      .then(
        (result) => {
          var moves = result.results;
          for (var key in moves) {
            add_moves(key + 1, moves[key].url);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async function add_types() {
    const pokemonData = await API.graphql({
      query: queries.listUserPokemons,
      variables: { limit: 100000000 },
    });
    var newPokemons = pokemonData.data.listUserPokemons.items;

    for (var key in newPokemons) {
      const pokemonData = await API.graphql({
        query: queries.listPokemons,
        variables: {
          filter: {
            name: {
              eq: newPokemons[key].pokemon,
            },
          },
          limit: 900,
        },
      });
      newPokemons[key].types = pokemonData.data.listPokemons.items[0].types;
      var old_user_pokemon = newPokemons[key];
      const newAccountData = {
        id: old_user_pokemon.id,
        accountID: old_user_pokemon.accountID,
        nickname: old_user_pokemon.nickname,
        image: old_user_pokemon.image,
        movelist: old_user_pokemon.movelist,
        types: old_user_pokemon.types,
        level: old_user_pokemon.level,
        level: old_user_pokemon.level,
      };
      API.graphql(
        graphqlOperation(updateUserPokemon, { input: newAccountData })
      );
    }
  }

  function add_moves(id, link) {
    fetch(link)
      .then((res) => res.json())
      .then(
        (result) => {
          var move_result = result;
          var move_type_promise = API.graphql({
            query: queries.listTypes,
            variables: {
              filter: {
                name: {
                  eq: result.type.name,
                },
              },
            },
          });
          var move_type = null;
          move_type_promise.then(function (result) {
            move_type = result.data.listTypes.items[0];
            var move_object = null;
            if (move_result.power == null) {
              move_object = {
                api_id: id,
                name: move_result.name,
                type: move_type.name,
                power: 0,
                api: link,
              };
            } else {
              move_object = {
                api_id: id,
                name: move_result.name,
                type: move_type.name,
                power: move_result.power,
                api: link,
              };
            }

            API.graphql(graphqlOperation(createMove, { input: move_object }));
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div>
      <button onClick={load_pokemon}>Load Pokemon</button>
      <button onClick={load_types}>Load Types</button>
      <button onClick={load_moves}>Load Moves</button>
      <button onClick={add_types}>Add Types</button>
    </div>
  );
}

export default withAuthenticator(MakeAPICalls);
