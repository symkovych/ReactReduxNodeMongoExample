import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import history from './history'
import store from './redux/store'
import { Router } from 'react-router'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Root />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
