import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getUsers, logOut} from '../actions/app'
import {Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import Posts from './Posts';
import Profile from './Profile';
import Users from './Users';
import AddOrEditPosts from './AddOrEditPosts';

class App extends Component {
    //before render get all users
    componentDidMount() {
        const {getUsers} = this.props;
        getUsers();
    }

    render() {
        const {logOut, currentUser} = this.props;
        return (
            //Fragment instead div, fragment not shows in DOM
            <Fragment>
                <NavBar logOut={logOut} currentUser={currentUser}/>
                <div className='switch'>
                    <Switch>
                        <Route exact path="/" component={Posts}/>
                        <Route exact path="/addPost" component={AddOrEditPosts}/>
                        <Route path="/posts/:id" component={AddOrEditPosts}/>
                        <Route path="/myProfile" component={Profile}/>} />
                        <Route path="/users" component={Users}/>} />
                    </Switch>
                </div>
            </Fragment>
        );
    }
}

function mapStoreToProps(store) {
    return {
        users: store.users.items,
        currentUser: store.users.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        logOut,
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
