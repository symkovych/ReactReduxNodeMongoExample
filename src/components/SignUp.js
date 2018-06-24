import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUp } from '../actions/app'

class SignUp extends Component {
  state = {
    email: '',
    pass: ''
  };
  signUp = () => {
    const { email, pass } = this.state;
    const { signUp, history } = this.props;

    signUp({ email, pass }, history);
  };

  onInputChange = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { email, pass } = this.state;
    const { errors } = this.props;

    return (<div>
        <h1>Sign Up</h1>
        <Input
          title="Email"
          onInputChange={(value) => {
            this.onInputChange(value, 'email')
          }}
          error={errors.email}
          value={email}
        />
            <br/>
        <Input
          title="Password"
          onInputChange={(value) => {
            this.onInputChange(value, 'pass')
          }}
          error={errors.pass}
          value={pass}
          type="password"
        />
            <br/>
        <Button
          title="Submit"
          onClick={this.signUp}
        />
            <br/>
        <NavLink to="/signIn">Already have account?</NavLink>
      </div>
    );
  }
}

function mapStoreToProps(store) {
  return {
    errors: store.app.errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signUp
  }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUp);