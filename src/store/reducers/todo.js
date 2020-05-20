import * as actionTypes from "../actions/actionTypes";

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const initialState = {
  users: [],
  todos: []
};

const createUser = (state, action) => {
  let users;
  if (state.users.filter(user => user.id === action.values.id).length > 0) {
    users = state.users.map(user => {
      if (user.id === action.values.id) return action.values;
      else return user;
    });
  } else {
    users = [...state.users, action.values];
  }
  return updateObject(state, {
    users
  });
};

const deleteUser = (state, action) => {
  return updateObject(state, {
    users: state.users.filter(user => user.id !== action.id)
  });
};

const addTodo = (state, action) => {
    let todos;
    if (state.todos.filter(todo => todo.id === action.values.id).length > 0) {
      todos = state.todos.map(todo => {
        if (todo.id === action.values.id) return action.values;
        else return todo;
      });
    } else {
      todos = [...state.todos, action.values];
    }
    return updateObject(state, {
      todos
    });
};

const deleteTodo = (state, action) => {
  return updateObject(state, {
    todos: state.todos.filter(todo => todo.id !== action.id)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.createUser:
      return createUser(state, action);
    case actionTypes.deleteUser:
      return deleteUser(state, action);
    case actionTypes.addTodo:
      return addTodo(state, action);
    case actionTypes.deleteTodo:
      return deleteTodo(state, action);
    default:
      return state;
  }
};

export default reducer;
