import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  return (
    <>
      <h1>CUSTOMER - LIST</h1>
    </>
  )
}
