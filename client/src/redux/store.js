import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'


import { authReducer } from "./Reducers/authReducers";


const allReducers = combineReducers({
    authReducer: authReducer
})

const store = createStore(allReducers, composeWithDevTools());

export default store;