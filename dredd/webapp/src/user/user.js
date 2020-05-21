import React, { useEffect, useState } from 'react';
import { v5 as uuidv5 } from 'uuid';
import md5 from 'blueimp-md5';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!!email || !!name || !!password) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(`${email} ${name}`, uuidv5.DNS),
      email,
      name,
      password: md5(password),
    };

    let res = await window.fetch('/api/user/sign-up', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.alert('数据已提交至服务器，请等待管理员审核。');
    window.history.go(-1);
  };

  return (
    <div className="container">
      <h1>STAFF - SIGN UP</h1>
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
          <div className="card shadow">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={email || ''}
                    autoComplete="email"
                    required
                    className="form-control"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>姓名</label>
                  <input
                    type="text"
                    name="name"
                    value={name || ''}
                    autoComplete="name"
                    required
                    className="form-control"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input
                    type="password"
                    value={password || ''}
                    autoComplete="current-password"
                    required
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleSignUp}
              >
                <i className="fa fa-fw fa-user-plus" />
                注册
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!!email || !!password) {
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
          <div className="card shadow">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={email || ''}
                    autoComplete="email"
                    required
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
                    required
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleSignIn}
              >
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
