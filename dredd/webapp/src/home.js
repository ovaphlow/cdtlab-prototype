import React from 'react'
import ReactDOM from 'react-dom'

function Index() {
  return (
    <div className="container">
      <h1>首页</h1>
      <hr />

      <div className="row justify-content-md-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="customer.html">
              <i className="fa fa-fw fa-address-card"></i>
              CUSTOMER
            </a>
          </li>

          <li className="list-inline-item">
            <a href="user.html#/注册">
              <i className="fa fa-fw fa-user-plus"></i>
              SIGN UP
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById('app'))
