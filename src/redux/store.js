import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import history from '../history'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducer from './index';

const enhancer = applyMiddleware(
  thunkMiddleware.withExtraArgument(reducer),
  routerMiddleware(history),
  logger
);

const store = createStore(reducer, enhancer);

window.store = store;

export default store;