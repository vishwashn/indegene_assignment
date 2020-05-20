import * as actionTypes from "./actionTypes";

export const createUser = values => {
  return {
    type: actionTypes.createUser,
    values
  };
};

export const deleteUser = id => {
  return {
    type: actionTypes.deleteUser,
    id
  };
};

export const addTodo = values => {
  return {
    type: actionTypes.addTodo,
    values
  };
};

export const deleteTodo = id => {
  return {
    type: actionTypes.deleteTodo,
    id
  };
};
