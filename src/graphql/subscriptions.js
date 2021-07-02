/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSingleTask = /* GraphQL */ `
  subscription OnCreateSingleTask {
    onCreateSingleTask {
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
export const onUpdateSingleTask = /* GraphQL */ `
  subscription OnUpdateSingleTask {
    onUpdateSingleTask {
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
export const onDeleteSingleTask = /* GraphQL */ `
  subscription OnDeleteSingleTask {
    onDeleteSingleTask {
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
export const onCreateMultipleTask = /* GraphQL */ `
  subscription OnCreateMultipleTask {
    onCreateMultipleTask {
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
export const onUpdateMultipleTask = /* GraphQL */ `
  subscription OnUpdateMultipleTask {
    onUpdateMultipleTask {
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
export const onDeleteMultipleTask = /* GraphQL */ `
  subscription OnDeleteMultipleTask {
    onDeleteMultipleTask {
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
export const onCreateRiddleTask = /* GraphQL */ `
  subscription OnCreateRiddleTask {
    onCreateRiddleTask {
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
export const onUpdateRiddleTask = /* GraphQL */ `
  subscription OnUpdateRiddleTask {
    onUpdateRiddleTask {
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
export const onDeleteRiddleTask = /* GraphQL */ `
  subscription OnDeleteRiddleTask {
    onDeleteRiddleTask {
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
export const onCreateMove = /* GraphQL */ `
  subscription OnCreateMove {
    onCreateMove {
      id
      name
      type
      power
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMove = /* GraphQL */ `
  subscription OnUpdateMove {
    onUpdateMove {
      id
      name
      type
      power
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMove = /* GraphQL */ `
  subscription OnDeleteMove {
    onDeleteMove {
      id
      name
      type
      power
      createdAt
      updatedAt
    }
  }
`;
