import * as actionTypes from "../actions/actionTypes";

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const initialState = {
  movies: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.fetchMovies:
      return updateObject(state, { movies: action.movies, error: null });
    case actionTypes.error:
      return updateObject(state, { movies: [], error: action.error });
    default:
      return state;
  }
};

export default reducer;
