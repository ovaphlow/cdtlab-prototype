import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Detail from './Detail';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/新增"><Detail category="新增" /></Route>
        <Route path="/:customer_journal_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
