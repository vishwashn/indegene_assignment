import * as actionTypes from "../actions/actionTypes";

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

const initialState = {
  movies: [],
  apiLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.apiLoading:
      return updateObject(state, { apiLoading: true });
    case actionTypes.fetchMovies:
      return updateObject(state, { movies: action.movies, error: null, apiLoading: false });
    case actionTypes.error:
      return updateObject(state, { movies: [], error: action.error, apiLoading: false });
    default:
      return state;
  }
};

export default reducer;
