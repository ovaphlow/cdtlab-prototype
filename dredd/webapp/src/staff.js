import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><List /></Route>
        <Route path="/:staff_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function List() {
  const [staff_list, setStaffList] = useState([])

  useEffect(() => {
    ;(async () => {
      let res = await window.fetch(`/api/staff/`)
      res = await res.json()
      setStaffList(res.content)
    })()
  }, [])

  return (
    <div className="container">
      <h1>STAFF</h1>
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
              <li className="breadcrumb-item active" aria-current="page">
                STAFF
              </li>
            </ol>
          </nav>

          <div className="card shadow">
            <div className="card-body">
              <div className="list-group">
                {staff_list.map(it => (
                  <a key={it.id} href={`#${it.id}?uuid=${it.uuid}`}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {it.certified === false && (
                          <>
                            <span className="badge badge-danger">未认证</span>
                            &nbsp;
                          </>
                        )}
                        {it.name}
                      </h5>
                      <small>{it.email}</small>
                    </div>
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
  const { staff_id } = useParams()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [certified, setCertified] = useState('0')

  const handleSave = async () => {
    if (!!!email || !!!name) {
      window.alert('请完整填写所需信息')
      return
    }

    const data = {
      email: email,
      name: name,
      certified: certified === '1' ? true : false
    }

    let res = await window.fetch(`/api/staff/${staff_id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
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

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return

    let res = await window.fetch(`/api/staff/${staff_id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
      method: 'DELETE'
    })
    res = await res.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async (id, uuid) => {
        let res = await window.fetch(`/api/staff/${id}?uuid=${uuid}`)
        res = await res.json()
        setEmail(res.content.email)
        setName(res.content.name)
        setCertified(res.content.certified ? '1' : '0')
      })(staff_id, new URLSearchParams(location.search).get('uuid'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <h1>STAFF</h1>
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

              <li className="breadcrumb-item active" aria-current="page">
                <a href="#/">
                  STAFF
                </a>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {props.category}
              </li>
            </ol>
          </nav>

          <div className="card shadow">
            <div className="card-body">
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" value={email || ''} autoComplete="email"
                  className="form-control"
                  onChange={event => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>姓名</label>
                <input type="text" value={name || ''} autoComplete="name"
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>认证</label>
                <select value={certified ? '1' : '0'} className="form-control"
                  onChange={event => setCertified(event.target.value)}
                >
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
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
                <button type="button" className="btn btn-outline-danger"
                  onClick={handleRemove}
                >
                  <i className="fa fa-fw fa-trash-o"></i>
                  删除
                </button>

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
      </div>
    </div>
  )
}
