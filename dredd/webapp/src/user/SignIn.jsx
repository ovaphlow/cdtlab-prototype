import React, { useEffect, useState } from 'react';
import md5 from 'blueimp-md5';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      email,
      password: md5(password),
    };

    let res = await window.fetch('/api/user/sign-in', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    res.content.certified && window.alert('当前登录的用户还没有通过认证。');
    window.sessionStorage.setItem('auth', JSON.stringify(res.content));
    window.location = 'index.html';
  };

  useEffect(() => {
    window.sessionStorage.removeItem('auth');
  }, []);

  return (
    <div className="container">
      <h1>STAFF - SIGN IN</h1>
      <hr />

      <div className="row justify-content-md-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="home.html">
              <i className="fa fa-fw fa-home" />
              首页
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-6 offset-3">
          <div className="card bg-dark shadow">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={email || ''}
                    autoComplete="email"
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input
                    type="password"
                    value={password || ''}
                    autoComplete="current-password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button type="button" className="btn btn-primary btn-block" onClick={handleSignIn}>
                <i className="fa fa-fw fa-sign-in" />
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
