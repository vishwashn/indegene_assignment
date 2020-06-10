import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import moviesReducer from "./reducers/movies";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  movies: moviesReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

export default store;