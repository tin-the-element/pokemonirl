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
export const onUpdateSingleTask = /* GraphQL */ `
  subscription OnUpdateSingleTask {
    onUpdateSingleTask {
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
export const onDeleteSingleTask = /* GraphQL */ `
  subscription OnDeleteSingleTask {
    onDeleteSingleTask {
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
export const onCreateMultipleTask = /* GraphQL */ `
  subscription OnCreateMultipleTask {
    onCreateMultipleTask {
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
export const onUpdateMultipleTask = /* GraphQL */ `
  subscription OnUpdateMultipleTask {
    onUpdateMultipleTask {
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
export const onDeleteMultipleTask = /* GraphQL */ `
  subscription OnDeleteMultipleTask {
    onDeleteMultipleTask {
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
export const onCreateRiddleTask = /* GraphQL */ `
  subscription OnCreateRiddleTask {
    onCreateRiddleTask {
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
export const onUpdateRiddleTask = /* GraphQL */ `
  subscription OnUpdateRiddleTask {
    onUpdateRiddleTask {
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
export const onDeleteRiddleTask = /* GraphQL */ `
  subscription OnDeleteRiddleTask {
    onDeleteRiddleTask {
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
export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
export const onCreateUserPokemon = /* GraphQL */ `
  subscription OnCreateUserPokemon {
    onCreateUserPokemon {
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
export const onUpdateUserPokemon = /* GraphQL */ `
  subscription OnUpdateUserPokemon {
    onUpdateUserPokemon {
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
export const onDeleteUserPokemon = /* GraphQL */ `
  subscription OnDeleteUserPokemon {
    onDeleteUserPokemon {
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
export const onCreatePokemon = /* GraphQL */ `
  subscription OnCreatePokemon {
    onCreatePokemon {
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
export const onUpdatePokemon = /* GraphQL */ `
  subscription OnUpdatePokemon {
    onUpdatePokemon {
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
export const onDeletePokemon = /* GraphQL */ `
  subscription OnDeletePokemon {
    onDeletePokemon {
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
export const onCreateMove = /* GraphQL */ `
  subscription OnCreateMove {
    onCreateMove {
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
export const onUpdateMove = /* GraphQL */ `
  subscription OnUpdateMove {
    onUpdateMove {
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
export const onDeleteMove = /* GraphQL */ `
  subscription OnDeleteMove {
    onDeleteMove {
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
export const onCreateType = /* GraphQL */ `
  subscription OnCreateType {
    onCreateType {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateType = /* GraphQL */ `
  subscription OnUpdateType {
    onUpdateType {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteType = /* GraphQL */ `
  subscription OnDeleteType {
    onDeleteType {
      id
      api_id
      name
      api
      createdAt
      updatedAt
    }
  }
`;
