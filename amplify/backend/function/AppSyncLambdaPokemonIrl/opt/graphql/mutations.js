"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteType = exports.updateType = exports.createType = exports.deleteMove = exports.updateMove = exports.createMove = exports.deletePokemon = exports.updatePokemon = exports.createPokemon = exports.deleteUserPokemon = exports.updateUserPokemon = exports.createUserPokemon = exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.deleteRiddleTask = exports.updateRiddleTask = exports.createRiddleTask = exports.deleteMultipleTask = exports.updateMultipleTask = exports.createMultipleTask = exports.deleteSingleTask = exports.updateSingleTask = exports.createSingleTask = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const createSingleTask =
/* GraphQL */
`
  mutation CreateSingleTask(
    $input: CreateSingleTaskInput!
    $condition: ModelSingleTaskConditionInput
  ) {
    createSingleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.createSingleTask = createSingleTask;
const updateSingleTask =
/* GraphQL */
`
  mutation UpdateSingleTask(
    $input: UpdateSingleTaskInput!
    $condition: ModelSingleTaskConditionInput
  ) {
    updateSingleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.updateSingleTask = updateSingleTask;
const deleteSingleTask =
/* GraphQL */
`
  mutation DeleteSingleTask(
    $input: DeleteSingleTaskInput!
    $condition: ModelSingleTaskConditionInput
  ) {
    deleteSingleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.deleteSingleTask = deleteSingleTask;
const createMultipleTask =
/* GraphQL */
`
  mutation CreateMultipleTask(
    $input: CreateMultipleTaskInput!
    $condition: ModelMultipleTaskConditionInput
  ) {
    createMultipleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.createMultipleTask = createMultipleTask;
const updateMultipleTask =
/* GraphQL */
`
  mutation UpdateMultipleTask(
    $input: UpdateMultipleTaskInput!
    $condition: ModelMultipleTaskConditionInput
  ) {
    updateMultipleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.updateMultipleTask = updateMultipleTask;
const deleteMultipleTask =
/* GraphQL */
`
  mutation DeleteMultipleTask(
    $input: DeleteMultipleTaskInput!
    $condition: ModelMultipleTaskConditionInput
  ) {
    deleteMultipleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.deleteMultipleTask = deleteMultipleTask;
const createRiddleTask =
/* GraphQL */
`
  mutation CreateRiddleTask(
    $input: CreateRiddleTaskInput!
    $condition: ModelRiddleTaskConditionInput
  ) {
    createRiddleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.createRiddleTask = createRiddleTask;
const updateRiddleTask =
/* GraphQL */
`
  mutation UpdateRiddleTask(
    $input: UpdateRiddleTaskInput!
    $condition: ModelRiddleTaskConditionInput
  ) {
    updateRiddleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.updateRiddleTask = updateRiddleTask;
const deleteRiddleTask =
/* GraphQL */
`
  mutation DeleteRiddleTask(
    $input: DeleteRiddleTaskInput!
    $condition: ModelRiddleTaskConditionInput
  ) {
    deleteRiddleTask(input: $input, condition: $condition) {
      id
      name
      images
      question
      turns_permitted
      exp_given
      win_quote
      lose_quote
      next_steps
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.deleteRiddleTask = deleteRiddleTask;
const createAccount =
/* GraphQL */
`
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
      id
      username
      users_pokemon {
        id
        pokemon {
          id
          api_id
          name
          types
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          completed_tasks
          createdAt
          updatedAt
        }
        image
        movelist
        createdAt
        updatedAt
      }
      money
      completed_tasks
      createdAt
      updatedAt
    }
  }
`;
exports.createAccount = createAccount;
const updateAccount =
/* GraphQL */
`
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
      id
      username
      users_pokemon {
        id
        pokemon {
          id
          api_id
          name
          types
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          completed_tasks
          createdAt
          updatedAt
        }
        image
        movelist
        createdAt
        updatedAt
      }
      money
      completed_tasks
      createdAt
      updatedAt
    }
  }
`;
exports.updateAccount = updateAccount;
const deleteAccount =
/* GraphQL */
`
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
      id
      username
      users_pokemon {
        id
        pokemon {
          id
          api_id
          name
          types
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          completed_tasks
          createdAt
          updatedAt
        }
        image
        movelist
        createdAt
        updatedAt
      }
      money
      completed_tasks
      createdAt
      updatedAt
    }
  }
`;
exports.deleteAccount = deleteAccount;
const createUserPokemon =
/* GraphQL */
`
  mutation CreateUserPokemon(
    $input: CreateUserPokemonInput!
    $condition: ModelUserPokemonConditionInput
  ) {
    createUserPokemon(input: $input, condition: $condition) {
      id
      pokemon {
        id
        api_id
        name
        types
        image
        api
        createdAt
        updatedAt
      }
      owner {
        id
        username
        users_pokemon {
          id
          image
          movelist
          createdAt
          updatedAt
        }
        money
        completed_tasks
        createdAt
        updatedAt
      }
      image
      movelist
      createdAt
      updatedAt
    }
  }
`;
exports.createUserPokemon = createUserPokemon;
const updateUserPokemon =
/* GraphQL */
`
  mutation UpdateUserPokemon(
    $input: UpdateUserPokemonInput!
    $condition: ModelUserPokemonConditionInput
  ) {
    updateUserPokemon(input: $input, condition: $condition) {
      id
      pokemon {
        id
        api_id
        name
        types
        image
        api
        createdAt
        updatedAt
      }
      owner {
        id
        username
        users_pokemon {
          id
          image
          movelist
          createdAt
          updatedAt
        }
        money
        completed_tasks
        createdAt
        updatedAt
      }
      image
      movelist
      createdAt
      updatedAt
    }
  }
`;
exports.updateUserPokemon = updateUserPokemon;
const deleteUserPokemon =
/* GraphQL */
`
  mutation DeleteUserPokemon(
    $input: DeleteUserPokemonInput!
    $condition: ModelUserPokemonConditionInput
  ) {
    deleteUserPokemon(input: $input, condition: $condition) {
      id
      pokemon {
        id
        api_id
        name
        types
        image
        api
        createdAt
        updatedAt
      }
      owner {
        id
        username
        users_pokemon {
          id
          image
          movelist
          createdAt
          updatedAt
        }
        money
        completed_tasks
        createdAt
        updatedAt
      }
      image
      movelist
      createdAt
      updatedAt
    }
  }
`;
exports.deleteUserPokemon = deleteUserPokemon;
const createPokemon =
/* GraphQL */
`
  mutation CreatePokemon(
    $input: CreatePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    createPokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types
      image
      api
      createdAt
      updatedAt
    }
  }
`;
exports.createPokemon = createPokemon;
const updatePokemon =
/* GraphQL */
`
  mutation UpdatePokemon(
    $input: UpdatePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    updatePokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types
      image
      api
      createdAt
      updatedAt
    }
  }
`;
exports.updatePokemon = updatePokemon;
const deletePokemon =
/* GraphQL */
`
  mutation DeletePokemon(
    $input: DeletePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    deletePokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types
      image
      api
      createdAt
      updatedAt
    }
  }
`;
exports.deletePokemon = deletePokemon;
const createMove =
/* GraphQL */
`
  mutation CreateMove(
    $input: CreateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    createMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type
      power
      api
      createdAt
      updatedAt
    }
  }
`;
exports.createMove = createMove;
const updateMove =
/* GraphQL */
`
  mutation UpdateMove(
    $input: UpdateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    updateMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type
      power
      api
      createdAt
      updatedAt
    }
  }
`;
exports.updateMove = updateMove;
const deleteMove =
/* GraphQL */
`
  mutation DeleteMove(
    $input: DeleteMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    deleteMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type
      power
      api
      createdAt
      updatedAt
    }
  }
`;
exports.deleteMove = deleteMove;
const createType =
/* GraphQL */
`
  mutation CreateType(
    $input: CreateTypeInput!
    $condition: ModelTypeConditionInput
  ) {
    createType(input: $input, condition: $condition) {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
exports.createType = createType;
const updateType =
/* GraphQL */
`
  mutation UpdateType(
    $input: UpdateTypeInput!
    $condition: ModelTypeConditionInput
  ) {
    updateType(input: $input, condition: $condition) {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
exports.updateType = updateType;
const deleteType =
/* GraphQL */
`
  mutation DeleteType(
    $input: DeleteTypeInput!
    $condition: ModelTypeConditionInput
  ) {
    deleteType(input: $input, condition: $condition) {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
exports.deleteType = deleteType;