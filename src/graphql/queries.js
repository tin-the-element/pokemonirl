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
      type
      question
      answer
      total_hp
      turns_permitted
      exp_given
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
        type
        question
        answer
        total_hp
        turns_permitted
        exp_given
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
      type
      question
      answer
      turns_permitted
      exp_given
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
        type
        question
        answer
        turns_permitted
        exp_given
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
      type
      question
      answer {
        id
        name
        type
        power
        createdAt
        updatedAt
      }
      turns_permitted
      exp_given
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
        type
        question
        answer {
          id
          name
          type
          power
          createdAt
          updatedAt
        }
        turns_permitted
        exp_given
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
      name
      type
      power
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
        name
        type
        power
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
