import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import moment from 'moment'

import { ListComponent as CustomerJournalList } from './customer-journal'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route exact path="/新增"><Detail category="新增" /></Route>
        <Route path="/:customer_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  const [customer_list, setCustomerList] = useState([])
  const [filter_name, setFilterName] = useState('')

  const handleFilter = async () => {
    setCustomerList([])
    let res = await window.fetch(`/api/customer/`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter_name: filter_name })
    })
    res = await res.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    setCustomerList(res.content)
  }

  useEffect(() => {
    ;(async () => {
      let res = await window.fetch(`/api/customer/`)
      res = await res.json()
      setCustomerList(res.content)
    })()
  }, [])

  return (
    <div className="container">
      <h1>CUSTOMER - LIST</h1>
      <hr />

      <div className="row">
        <div className="offset-2 col-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fa fa-fw fa-home"></i>
                  HOME
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                CUSTOMER
              </li>
            </ol>
          </nav>

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-outline-success btn-sm"
              onClick={() => window.location = '#/新增'}
            >
              <i className="fa fa-fw fa-plus"></i>
              新增
            </button>
          </div>

          <div className="clearfix m-2"></div>

          <div className="card shadow">
            <div className="card-header">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">名称/电话</span>
                </div>
                <input type="text" name={filter_name || ''}
                  className="form-control"
                  onChange={event => setFilterName(event.target.value)}
                />
              </div>

              <div className="mt-2">
                <div className="btn-group">
                  <button type="button" className="btn btn-outline-secondary btn-sm"
                    onClick={() => window.location.reload(true)}
                  >
                    <i className="fa fa-fw fa-refresh"></i>
                    重置
                  </button>
                </div>

                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-outline-info btn-sm"
                    onClick={handleFilter}
                  >
                    <i className="fa fa-fw fa-search"></i>
                    查询
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="list-group">
                {customer_list.map(it => (
                  <a key={it.id} href={`#${it.id}`}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {it.name}
                      </h5>
                      <small>
                        电话：{it.tel}
                      </small>
                    </div>
                    <ul className="list-inline mb-1">
                      地址：
                      <li className="list-inline-item">{it.address_level1}</li>
                      <li className="list-inline-item">{it.address_level2}</li>
                      <li className="list-inline-item">{it.address_level3}</li>
                      <li className="list-inline-item">{it.address_level4}</li>
                    </ul>
                    <small>添加于：{moment(it.created_at).format('YYYY-MM-DD')}</small>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail(props) {
  const { customer_id } = useParams()
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
      address_level4: address_level4
    }

    if (props.category === '新增') {
      let res = await window.fetch(`/api/customer/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      res = await res.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      let res = await window.fetch(`/api/customer/${customer_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      res = await res.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    }
  }

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async customer_id => {
        let res = await window.fetch(`/api/customer/${customer_id}`)
        res = await res.json()
        setName(res.content.name)
        setTel(res.content.tel)
        setAddressLevel1(res.content.address_level1)
        setAddressLevel2(res.content.address_level2)
        setAddressLevel3(res.content.address_level3)
        setAddressLevel4(res.content.address_level4)
      })(customer_id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <h1>CUSTOMER - {props.category}</h1>
      <hr />

      <div className="row">
        <div className="col-8 offset-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">
                  <i className="fa fa-fw fa-home"></i>
                  HOME
                </a>
              </li>

              <li className="breadcrumb-item">
                <a href="#/">
                  CUSTOMER
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {props.category}
              </li>
            </ol>
          </nav>
        </div>

        <div className={props.category === '新增' ? 'offset-2 col-8' : 'col-8'}>
          <div className="card shadow">
            <div className="card-header">
              <span className="lead mb-0">CUSTOMER - {name}</span>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>名称</label>
                    <input type="text" value={name || ''} required
                      className="form-control"
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label>电话</label>
                    <input type="tel" value={tel || ''}
                      className="form-control"
                      onChange={event => setTel(event.target.value)}
                    />
                  </div>
                </div>
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
                  <i className="fa fa-fw fa-save"></i>
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>

        {props.category === '编辑' && (
          <div className="col">
            <div className="card shadow">
              <div className="card-header">
                <span className="lead mb-0">沟通记录</span>
                <div className="btn-group pull-right">
                  <button type="button" className="btn btn-outline-success btn-sm"
                    onClick={() => window.location = `customer-journal.html#/新增?customer_id=${customer_id}`}
                  >
                    <i className="fa fa-fw fa-plus"></i>
                    沟通记录
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                <CustomerJournalList customer_id={customer_id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
