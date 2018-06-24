import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { func, bool } from 'prop-types'
import App from './App';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router'

import { checkSession } from '../actions/app'

class Root extends Component {
  componentDidMount() {
    const { checkSession, history } = this.props;

    checkSession(history);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {isLoggedIn && <Route path="/" component={App} />}
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signIn" component={SignIn} />
      </Switch>
    );
  }
}

Root.propTypes = {
  isLoggedIn: bool,
  checkSession: func.isRequired
};

Root.defaultProps = {
  isLoggedIn: false,
};

function mapStoreToProps(store) {
  return {
    isLoggedIn: store.app.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkSession
  }, dispatch)
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Root));