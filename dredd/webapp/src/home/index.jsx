import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app')
);

function Index() {
  return (
    <div className="container">
      <h1>
        <em>DREDD</em>
      </h1>
      <hr />

      <div className="row justify-content-md-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="customer.html">
              <i className="fa fa-fw fa-address-card" />
              CUSTOMER
            </a>
          </li>

          <li className="list-inline-item">
            <a href="staff.html">
              <i className="fa fa-fw fa-users" />
              STAFF
            </a>
          </li>

          <li className="list-inline-item">
            <a href="user.html#/登录">
              <i className="fa fa-fw fa-sign-in" />
              SIGN IN
            </a>
          </li>

          <li className="list-inline-item">
            <a href="user.html#/注册">
              <i className="fa fa-fw fa-user-plus" />
              SIGN UP
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
