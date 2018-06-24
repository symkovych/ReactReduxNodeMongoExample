import React, {Component} from 'react';
import Button from './Button'
import Input from './Input'
import {deleteUser, createUser} from '../actions/app'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            name:'',
            email:'',
            pass:''
        };
    }
    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };
    setAdminUser = () => {
        this.setState({
            isAdmin: !this.state.isAdmin
        });
    };
    deleteUser = (_id) => {
        const {deleteUser} = this.props;
        deleteUser(_id);
    };
    renderUsers = (el) => {
        const Delete = <Button title = 'Delete' onClick = {() => {return this.deleteUser(el._id)}} className = 'btn-danger' />;
        return (
            <li key={el._id}>
                {el.name} {Delete}
            </li>
        )
    };
    createUser = () => {
        const {createUser} = this.props;
        const {name,email,pass,isAdmin} = this.state;
        createUser({name,email,pass,isAdmin});
    }
    render() {
        const {users} = this.props;
        const {name,email, pass} = this.state;
        return (
            <div>
                <h4>Add user</h4>
                <Input title = "User name" value={name}
                       onInputChange={(value) => {this.onInputChange(value, 'name')
                       }}/>
                <br/>
                <Input title = "Email" value={email}
                       onInputChange={(value) => { this.onInputChange(value, 'email')
                       }}/>
                <br/>
                <Input title = "Password" value={pass}
                       onInputChange={(value) => { this.onInputChange(value, 'pass')
                       }}/> <br/>
                <label> <input
                        type = 'checkbox'
                        onClick = {() => {this.setAdminUser()}}/> Admin user </label>
                <br/>
                <Button title = "Create user" className = "btn btn-primary"
                        onClick = {this.createUser}/>
                <hr/>
                <h4>Delete users:</h4>
                <ul>
                    {users.map(this.renderUsers)}
                </ul>
            </div>
        )
    }
}

function mapStoreToProps(store) {
    return {
        users: store.users.items
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteUser,
        createUser
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(Users);
