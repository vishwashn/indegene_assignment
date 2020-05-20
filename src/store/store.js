import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import todoReducer from "./reducers/todo";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  todo: todoReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

export default store;