/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSingleTask = /* GraphQL */ `
  query GetSingleTask($id: ID!) {
    getSingleTask(id: $id) {
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
export const listSingleTasks = /* GraphQL */ `
  query ListSingleTasks(
    $filter: ModelSingleTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSingleTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMultipleTask = /* GraphQL */ `
  query GetMultipleTask($id: ID!) {
    getMultipleTask(id: $id) {
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
export const listMultipleTasks = /* GraphQL */ `
  query ListMultipleTasks(
    $filter: ModelMultipleTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMultipleTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRiddleTask = /* GraphQL */ `
  query GetRiddleTask($id: ID!) {
    getRiddleTask(id: $id) {
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
export const listRiddleTasks = /* GraphQL */ `
  query ListRiddleTasks(
    $filter: ModelRiddleTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRiddleTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
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
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUserPokemon = /* GraphQL */ `
  query GetUserPokemon($id: ID!) {
    getUserPokemon(id: $id) {
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
export const listUserPokemons = /* GraphQL */ `
  query ListUserPokemons(
    $filter: ModelUserPokemonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPokemons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPokemon = /* GraphQL */ `
  query GetPokemon($id: ID!) {
    getPokemon(id: $id) {
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
export const listPokemons = /* GraphQL */ `
  query ListPokemons(
    $filter: ModelPokemonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPokemons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        api_id
        name
        types
        image
        api
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMove = /* GraphQL */ `
  query GetMove($id: ID!) {
    getMove(id: $id) {
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
export const listMoves = /* GraphQL */ `
  query ListMoves(
    $filter: ModelMoveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoves(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        api_id
        name
        type
        power
        api
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getType = /* GraphQL */ `
  query GetType($id: ID!) {
    getType(id: $id) {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
export const listTypes = /* GraphQL */ `
  query ListTypes(
    $filter: ModelTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        api_id
        name
        api
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPokemons = /* GraphQL */ `
  query SearchPokemons(
    $filter: SearchablePokemonFilterInput
    $sort: SearchablePokemonSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPokemons(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        api_id
        name
        types
        image
        api
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchMoves = /* GraphQL */ `
  query SearchMoves(
    $filter: SearchableMoveFilterInput
    $sort: SearchableMoveSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchMoves(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        api_id
        name
        type
        power
        api
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
