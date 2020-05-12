import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route path="/新增"><Detail category="新增" /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  return (
    <div className="container">
      <h1>CUSTOMER - LIST</h1>

      <div className="row justify-content-lg-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="home.html">首页</a>
          </li>

          <li className="list-inline-item">
            <a href="#/">
              <strong>查询</strong>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="#新增">新增</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Detail(props) {
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [address_level1, setAddressLevel1] = useState('')
  const [address_level2, setAddressLevel2] = useState('')
  const [address_level3, setAddressLevel3] = useState('')
  const [address_level4, setAddressLevel4] = useState('')

  const handleSave = async () => {
    if (!!!name) {
      window.alert('请完整填写所需信息')
      return
    }

    const data = {
      uuid: uuidv5(name, uuidv5.DNS),
      name: name,
      tel: tel,
      address_level1: address_level1,
      address_level2: address_level2,
      address_level3: address_level3,
      address_level4: address_level4,
    }

    if (props.category === '新增') {
      let res = await window.fetch(`/api/customer/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      res = await res.json()
      console.info(res)
    }
  }

  return (
    <div className="container">
      <h1>{props.category} CUSTOMER</h1>

      <div className="row justify-content-md-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="home.html">首页</a>
          </li>

          <li className="list-inline-item">
            <a href="#/">查询</a>
          </li>

          <li className="list-inline-item">
            <a href="#新增">
              <strong>新增</strong>
            </a>
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="row">
          <div className="offset-2 col-8">
            <div className="card shadow">
              <div className="card-body">
                <div className="form-group">
                  <label>名称</label>
                  <input type="text" value={name || ''} required
                    className="form-control"
                    onChange={event => setName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>电话</label>
                  <input type="tel" value={tel || ''}
                    className="form-control"
                    onChange={event => setTel(event.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>地址</label>
                      <input type="text" value={address_level1 || ''}
                        className="form-control"
                        onChange={event => setAddressLevel1(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <input type="text" value={address_level2 || ''}
                        className="form-control"
                        onChange={event => setAddressLevel2(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <input type="text" value={address_level3 || ''}
                        className="form-control"
                        onChange={event => setAddressLevel3(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label></label>
                  <input type="text" value={address_level4 || ''}
                    className="form-control"
                    onChange={event => setAddressLevel4(event.target.value)}
                  />
                </div>
              </div>

              <div className="card-footer">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary"
                    onClick={() => window.history.go(-1)}
                  >
                    返回
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-primary"
                    onClick={handleSave}
                  >
                    <i className="fa fa-fw fa-check"></i>
                    保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
