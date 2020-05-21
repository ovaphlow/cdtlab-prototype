import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';

import List from './List';
import Detail from './Detail';

ReactDOM.render(<Index />, document.getElementById('app'));

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route path="/:staff_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  );
}
