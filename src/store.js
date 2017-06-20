
import { createStore, applyMiddleware } from 'redux';
import AppReducer from './appReducer.js';
import ReduxPromise from 'redux-promise';
import { routerMiddleware, push } from 'react-router-redux';
import { browserHistory } from 'react-router';

const routeMiddle = routerMiddleware(browserHistory);
const storeWithMiddleware = applyMiddleware(ReduxPromise, routeMiddle)(createStore);
let store = storeWithMiddleware(AppReducer);

export default store;