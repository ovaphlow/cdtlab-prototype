import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import moment from 'moment'

ReactDOM.render(<Index />, document.getElementById('app'))

function Index() {
  return (
    <Router>
      <Switch>
        <Route exact path="/新增"><Detail category="新增" /></Route>
        <Route path="/:customer_journal_id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

export function ListComponent(props) {
  const [customer_journal_list, setCustomerJournalList] = useState([])

  useEffect(() => {
    ;(async customer_id => {
      let res = await window.fetch(`/api/customer-journal/?customer_id=${customer_id}`)
      res = await res.json()
      setCustomerJournalList(res.content)
    })(props.customer_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="list-group">
      {customer_journal_list.map(it => (
        <a key={it.id} href={`customer-journal.html#/${it.id}?customer_id=${props.customer_id}`}
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">{it.staff}</h5>
          <small>{moment(it.datime).fromNow()}</small>
          <p className="mb-1">{it.client}</p>
        </a>
      ))}
    </div>
  )
}

function Detail(props) {
  const { customer_journal_id } = useParams()
  const location = useLocation()
  const [staff, setStaff] = useState('')
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
  const [time, setTime] = useState(moment().format('HH:mm:ss'))
  const [client, setClient] = useState('')
  const [content, setContent] = useState('')

  const handleSave = async () => {
    if (!!!staff || !!!date || !!!time || !!!client || !!!content) {
      window.alert('请完整填写所需信息')
      return
    }

    const data = {
      uuid: uuidv5(`${staff} ${date} ${time}`, uuidv5.DNS),
      staff_id: 0,
      staff: staff,
      datime: `${date} ${time}`,
      customer_id: new URLSearchParams(location.search).get('customer_id'),
      client: client,
      content: content
    }

    if (props.category === '新增') {
      let res = await window.fetch(`/api/customer-journal/`, {
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
      let res = await window.fetch(`/api/customer-journal/${customer_journal_id}`, {
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
      ;(async id => {
        let res = await window.fetch(`/api/customer-journal/${id}`)
        res = await res.json()
        setStaff(res.content.staff)
        setDate(moment(res.content.datime).format('YYYY-MM-DD'))
        setTime(moment(res.content.datime).format('HH:mm:ss'))
        setClient(res.content.client)
        setContent(res.content.content)
      })(customer_journal_id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <h1>CUSTOMER JOURNAL - {props.category}</h1>
      <hr />

      <div className="row justify-content-md-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="home.html">
              <i className="fa fa-fw fa-home"></i>
              首页
            </a>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="offset-2 col-8">
          <div className="card shadow">
            <div className="card-header">
              <div className="btn-group">
                <button type="button" className="btn btn-outline-secondary btn-sm"
                  onClick={() => window.history.go(-1)}
                >
                  返回
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label>职员</label>
                <input type="text" value={staff || ''}
                  className="form-control"
                  onChange={event => setStaff(event.target.value)}
                />
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>日期</label>
                    <input type="date" value={date || ''}
                      className="form-control"
                      onChange={event => setDate(event.target.value)}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label>时间</label>
                    <input type="time" value={time || ''}
                      className="form-control"
                      onChange={event => setTime(event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>客户</label>
                <input type="text" value={client || ''}
                  className="form-control"
                  onChange={event => setClient(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>内容</label>
                <textarea value={content || ''} rows="3"
                  className="form-control"
                  onChange={event => setContent(event.target.value)}
                ></textarea>
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
      </div>
    </div>
  )
}
