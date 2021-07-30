"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDeleteType = exports.onUpdateType = exports.onCreateType = exports.onDeleteMove = exports.onUpdateMove = exports.onCreateMove = exports.onDeletePokemon = exports.onUpdatePokemon = exports.onCreatePokemon = exports.onDeleteUserPokemon = exports.onUpdateUserPokemon = exports.onCreateUserPokemon = exports.onDeleteAccount = exports.onUpdateAccount = exports.onCreateAccount = exports.onDeleteRiddleTask = exports.onUpdateRiddleTask = exports.onCreateRiddleTask = exports.onDeleteMultipleTask = exports.onUpdateMultipleTask = exports.onCreateMultipleTask = exports.onDeleteSingleTask = exports.onUpdateSingleTask = exports.onCreateSingleTask = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const onCreateSingleTask =
/* GraphQL */
`
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
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.onCreateSingleTask = onCreateSingleTask;
const onUpdateSingleTask =
/* GraphQL */
`
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
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.onUpdateSingleTask = onUpdateSingleTask;
const onDeleteSingleTask =
/* GraphQL */
`
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
      answer
      total_hp
      createdAt
      updatedAt
    }
  }
`;
exports.onDeleteSingleTask = onDeleteSingleTask;
const onCreateMultipleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onCreateMultipleTask = onCreateMultipleTask;
const onUpdateMultipleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onUpdateMultipleTask = onUpdateMultipleTask;
const onDeleteMultipleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onDeleteMultipleTask = onDeleteMultipleTask;
const onCreateRiddleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onCreateRiddleTask = onCreateRiddleTask;
const onUpdateRiddleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onUpdateRiddleTask = onUpdateRiddleTask;
const onDeleteRiddleTask =
/* GraphQL */
`
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
      answer
      createdAt
      updatedAt
    }
  }
`;
exports.onDeleteRiddleTask = onDeleteRiddleTask;
const onCreateAccount =
/* GraphQL */
`
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
exports.onCreateAccount = onCreateAccount;
const onUpdateAccount =
/* GraphQL */
`
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
exports.onUpdateAccount = onUpdateAccount;
const onDeleteAccount =
/* GraphQL */
`
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
exports.onDeleteAccount = onDeleteAccount;
const onCreateUserPokemon =
/* GraphQL */
`
  subscription OnCreateUserPokemon {
    onCreateUserPokemon {
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
exports.onCreateUserPokemon = onCreateUserPokemon;
const onUpdateUserPokemon =
/* GraphQL */
`
  subscription OnUpdateUserPokemon {
    onUpdateUserPokemon {
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
exports.onUpdateUserPokemon = onUpdateUserPokemon;
const onDeleteUserPokemon =
/* GraphQL */
`
  subscription OnDeleteUserPokemon {
    onDeleteUserPokemon {
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
exports.onDeleteUserPokemon = onDeleteUserPokemon;
const onCreatePokemon =
/* GraphQL */
`
  subscription OnCreatePokemon {
    onCreatePokemon {
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
exports.onCreatePokemon = onCreatePokemon;
const onUpdatePokemon =
/* GraphQL */
`
  subscription OnUpdatePokemon {
    onUpdatePokemon {
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
exports.onUpdatePokemon = onUpdatePokemon;
const onDeletePokemon =
/* GraphQL */
`
  subscription OnDeletePokemon {
    onDeletePokemon {
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
exports.onDeletePokemon = onDeletePokemon;
const onCreateMove =
/* GraphQL */
`
  subscription OnCreateMove {
    onCreateMove {
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
exports.onCreateMove = onCreateMove;
const onUpdateMove =
/* GraphQL */
`
  subscription OnUpdateMove {
    onUpdateMove {
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
exports.onUpdateMove = onUpdateMove;
const onDeleteMove =
/* GraphQL */
`
  subscription OnDeleteMove {
    onDeleteMove {
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
exports.onDeleteMove = onDeleteMove;
const onCreateType =
/* GraphQL */
`
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
exports.onCreateType = onCreateType;
const onUpdateType =
/* GraphQL */
`
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
exports.onUpdateType = onUpdateType;
const onDeleteType =
/* GraphQL */
`
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
exports.onDeleteType = onDeleteType;