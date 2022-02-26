import { combineReducers, applyMiddleware, createStore } from "redux";
import { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import CartItem from "./Reducers/CartItem";

const reducers = combineReducers({
     CartItem
});

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
);

export default store;