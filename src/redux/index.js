import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import app from './app';
import users from './users';
import posts from './posts';
// import comments from './comments';

const extendedReducers = Object.assign({}, {
    app,
    users,
    posts
    // comments
}, {
    routing
});

export default combineReducers(extendedReducers)