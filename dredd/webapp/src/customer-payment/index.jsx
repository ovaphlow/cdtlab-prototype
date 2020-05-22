import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/新增"><Detail cat="新增" /></Route>
      </Switch>
    </Router>
  );
}
