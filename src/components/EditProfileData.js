import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from './Button';
import Input from './Input';
import {updateUser} from '../actions/app'

class EditProfileData extends Component {
    state = {
        email: this.props.currentUser.email,
        pass: '',
        name: this.props.currentUser.name,
        id: this.props.currentUser._id
    };

    updateUser = () => {
        const {email, pass, name, id} = this.state;
        const {updateUser} = this.props;
        const currentUser = this.props.currentUser;

        updateUser({id, name, email, pass, currentUser});
    };

    onInputChange = (value, key) => {
        this.setState({
            [key]: value
        });
    };

    render() {
        const {email, pass, name, id} = this.state;
//update server route -> action fetch -> in mongo save img url
        return (
            <div>
                <div>
                    <form ref='uploadForm'
                          id='uploadForm'
                          action={'http://localhost:3000/upload/' + id}
                          method='post'
                          encType="multipart/form-data">
                        <input type="file" name="sampleFile" className="btn btn-light"/>
                        <input type='submit' value='Upload!' className="btn btn-warning"/>
                    </form>
                </div>
                <Input title="Change username" value={name}
                       onInputChange={(value) => {
                           this.onInputChange(value, 'name')
                       }}/>
                <br/>
                <Input title="Change email" value={email}
                       onInputChange={(value) => {
                           this.onInputChange(value, 'email')
                       }}/>
                <br/>
                <Input title="Change password" value={pass}
                       type="password"
                       onInputChange={(value) => {
                           this.onInputChange(value, 'pass')
                       }}/> <br/>
                <Button title="Update profile data" className="btn btn-danger"
                        onClick={this.updateUser}/>
            </div>);
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateUser
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditProfileData);
