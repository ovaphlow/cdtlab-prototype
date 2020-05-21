import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import SignUp from './SignUp';
import { SignIn } from './user';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <Router>
      <Switch>
        <Route path="/注册"><SignUp /></Route>
        <Route path="/登录"><SignIn /></Route>
      </Switch>
    </Router>
  );
}
