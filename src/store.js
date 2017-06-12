
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './appReducer.js';
import ReduxPromise from 'redux-promise';
import { routerMiddleware, push } from 'react-router-redux';
import {browserHistory } from 'react-router';

const routeMiddleware = routerMiddleware(browserHistory);
const storeWithMiddleware = applyMiddleware(ReduxPromise, routeMiddleware)(createStore);
let store = storeWithMiddleware(AppReducer);

export default store;