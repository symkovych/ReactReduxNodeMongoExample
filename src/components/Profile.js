import React, {Component} from 'react';
import Button from './Button';
import EditProfileData from './EditProfileData';
import store from '../redux/store'

class Profile extends Component {
    state = {
        showSettings: false
    };
    showSettings = () => {
        this.setState({showSettings: !this.state.showSettings});
    };

    render() {
        const currentUser = store.getState().users.currentUser;
        return (
            <div>
                <img alt='Profile img' width="100px" src={'../img/' + currentUser._id + '.jpg'}/>
                <h1>Hello {currentUser.name} !</h1>
                <Button className="btn btn-success"
                        title={!this.state.showSettings ? "Edit profile data" : "Hide settings"}
                        onClick={this.showSettings}/>
                {this.state.showSettings && <EditProfileData/>}

            </div>);
    }
}

export default Profile;
