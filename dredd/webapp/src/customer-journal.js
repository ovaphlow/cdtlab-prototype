import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import moment from 'moment'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/新增"><Detail category="新增" /></Route>
      </Switch>
    </Router>
  )
}

function Detail(props) {
  return (
    <h1>CUSTOMER JOURNAL</h1>
  )
}
