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
export const updateSingleTask = /* GraphQL */ `
  mutation UpdateSingleTask(
    $input: UpdateSingleTaskInput!
    $condition: ModelSingleTaskConditionInput
  ) {
    updateSingleTask(input: $input, condition: $condition) {
      id
      name
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
export const deleteSingleTask = /* GraphQL */ `
  mutation DeleteSingleTask(
    $input: DeleteSingleTaskInput!
    $condition: ModelSingleTaskConditionInput
  ) {
    deleteSingleTask(input: $input, condition: $condition) {
      id
      name
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
export const createMultipleTask = /* GraphQL */ `
  mutation CreateMultipleTask(
    $input: CreateMultipleTaskInput!
    $condition: ModelMultipleTaskConditionInput
  ) {
    createMultipleTask(input: $input, condition: $condition) {
      id
      name
      question
      answer
      turns_permitted
      exp_given
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
      question
      answer
      turns_permitted
      exp_given
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
      question
      answer
      turns_permitted
      exp_given
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
export const updateRiddleTask = /* GraphQL */ `
  mutation UpdateRiddleTask(
    $input: UpdateRiddleTaskInput!
    $condition: ModelRiddleTaskConditionInput
  ) {
    updateRiddleTask(input: $input, condition: $condition) {
      id
      name
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
export const deleteRiddleTask = /* GraphQL */ `
  mutation DeleteRiddleTask(
    $input: DeleteRiddleTaskInput!
    $condition: ModelRiddleTaskConditionInput
  ) {
    deleteRiddleTask(input: $input, condition: $condition) {
      id
      name
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
export const createMove = /* GraphQL */ `
  mutation CreateMove(
    $input: CreateMoveInput!
    $condition: ModelMoveConditionInput
  ) {
    createMove(input: $input, condition: $condition) {
      id
      name
      type
      power
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
      name
      type
      power
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
      name
      type
      power
      createdAt
      updatedAt
    }
  }
`;
