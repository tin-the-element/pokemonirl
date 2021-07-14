/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createSingleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      total_hp
      createdAt
      updatedAt
    }
  }
`;
export const updateSingleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      total_hp
      createdAt
      updatedAt
    }
  }
`;
export const deleteSingleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      total_hp
      createdAt
      updatedAt
    }
  }
`;
export const createMultipleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateMultipleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteMultipleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createRiddleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRiddleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRiddleTask = /* GraphQL */ `
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
      answer {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAccount = /* GraphQL */ `
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
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          createdAt
          updatedAt
        }
        image
        movelist {
          id
          api_id
          name
          power
          api
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      money
      completed_tasks {
        id
        name
        images
        question
        turns_permitted
        exp_given
        win_quote
        lose_quote
        ... on SingleTask {
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          total_hp
          createdAt
          updatedAt
        }
        ... on MultipleTask {
          next_steps
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        ... on RiddleTask {
          next_steps
          answer {
            id
            api_id
            name
            power
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAccount = /* GraphQL */ `
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
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          createdAt
          updatedAt
        }
        image
        movelist {
          id
          api_id
          name
          power
          api
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      money
      completed_tasks {
        id
        name
        images
        question
        turns_permitted
        exp_given
        win_quote
        lose_quote
        ... on SingleTask {
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          total_hp
          createdAt
          updatedAt
        }
        ... on MultipleTask {
          next_steps
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        ... on RiddleTask {
          next_steps
          answer {
            id
            api_id
            name
            power
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAccount = /* GraphQL */ `
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
          image
          api
          createdAt
          updatedAt
        }
        owner {
          id
          username
          money
          createdAt
          updatedAt
        }
        image
        movelist {
          id
          api_id
          name
          power
          api
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      money
      completed_tasks {
        id
        name
        images
        question
        turns_permitted
        exp_given
        win_quote
        lose_quote
        ... on SingleTask {
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          total_hp
          createdAt
          updatedAt
        }
        ... on MultipleTask {
          next_steps
          answer {
            id
            api_id
            name
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        ... on RiddleTask {
          next_steps
          answer {
            id
            api_id
            name
            power
            api
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserPokemon = /* GraphQL */ `
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
        types {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        money
        completed_tasks {
          id
          name
          images
          question
          turns_permitted
          exp_given
          win_quote
          lose_quote
          ... on SingleTask {
            total_hp
            createdAt
            updatedAt
          }
          ... on MultipleTask {
            next_steps
            createdAt
            updatedAt
          }
          ... on RiddleTask {
            next_steps
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
      image
      movelist {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUserPokemon = /* GraphQL */ `
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
        types {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        money
        completed_tasks {
          id
          name
          images
          question
          turns_permitted
          exp_given
          win_quote
          lose_quote
          ... on SingleTask {
            total_hp
            createdAt
            updatedAt
          }
          ... on MultipleTask {
            next_steps
            createdAt
            updatedAt
          }
          ... on RiddleTask {
            next_steps
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
      image
      movelist {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserPokemon = /* GraphQL */ `
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
        types {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
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
          createdAt
          updatedAt
        }
        money
        completed_tasks {
          id
          name
          images
          question
          turns_permitted
          exp_given
          win_quote
          lose_quote
          ... on SingleTask {
            total_hp
            createdAt
            updatedAt
          }
          ... on MultipleTask {
            next_steps
            createdAt
            updatedAt
          }
          ... on RiddleTask {
            next_steps
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
      image
      movelist {
        id
        api_id
        name
        type {
          id
          api_id
          name
          api
          createdAt
          updatedAt
        }
        power
        api
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPokemon = /* GraphQL */ `
  mutation CreatePokemon(
    $input: CreatePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    createPokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      image
      api
      createdAt
      updatedAt
    }
  }
`;
export const updatePokemon = /* GraphQL */ `
  mutation UpdatePokemon(
    $input: UpdatePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    updatePokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      image
      api
      createdAt
      updatedAt
    }
  }
`;
export const deletePokemon = /* GraphQL */ `
  mutation DeletePokemon(
    $input: DeletePokemonInput!
    $condition: ModelPokemonConditionInput
  ) {
    deletePokemon(input: $input, condition: $condition) {
      id
      api_id
      name
      types {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      image
      api
      createdAt
      updatedAt
    }
  }
`;
export const createMove = /* GraphQL */ `
  mutation CreateMove(
    $input: CreateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    createMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      power
      api
      createdAt
      updatedAt
    }
  }
`;
export const updateMove = /* GraphQL */ `
  mutation UpdateMove(
    $input: UpdateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    updateMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      power
      api
      createdAt
      updatedAt
    }
  }
`;
export const deleteMove = /* GraphQL */ `
  mutation DeleteMove(
    $input: DeleteMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    deleteMove(input: $input, condition: $condition) {
      id
      api_id
      name
      type {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      power
      api
      createdAt
      updatedAt
    }
  }
`;
export const createType = /* GraphQL */ `
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
export const updateType = /* GraphQL */ `
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
export const deleteType = /* GraphQL */ `
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
