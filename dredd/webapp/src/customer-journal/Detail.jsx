import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';
import moment from 'moment';

export default function Detail(props) {
  const { category } = props;
  const { customer_journal_id } = useParams();
  const location = useLocation();
  const [staff, setStaff] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [client, setClient] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!staff || !date || !time || !client || !content) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(`${staff} ${date} ${time}`, uuidv5.DNS),
      staff_id: 0,
      staff,
      datime: `${date} ${time}`,
      customer_id: new URLSearchParams(location.search).get('customer_id'),
      client,
      content,
    };

    if (props.category === '新增') {
      let res = await window.fetch('/api/customer-journal/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      res = await res.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (props.category === '编辑') {
      let res = await window.fetch(`/api/customer-journal/${customer_journal_id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      res = await res.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  useEffect(() => {
    if (props.category === '编辑') {
      (async (id) => {
        let res = await window.fetch(`/api/customer-journal/${id}`);
        res = await res.json();
        setStaff(res.content.staff);
        setDate(moment(res.content.datime).format('YYYY-MM-DD'));
        setTime(moment(res.content.datime).format('HH:mm:ss'));
        setClient(res.content.client);
        setContent(res.content.content);
      })(customer_journal_id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>CUSTOMER JOURNAL</h1>
      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">
              <i className="fa fa-fw fa-home" />
              HOME
            </a>
          </li>

          <li className="breadcrumb-item">
            <a href="customer.html">
              CUSTOMER
            </a>
          </li>

          <li className="breadcrumb-item">
            JOURNAL
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {category}
          </li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="card-header">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.history.go(-1)}
            >
              返回
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="form-group">
            <label>职员</label>
            <input
              type="text"
              value={staff || ''}
              className="form-control"
              onChange={(event) => setStaff(event.target.value)}
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>日期</label>
                <input
                  type="date"
                  value={date || ''}
                  className="form-control"
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>时间</label>
                <input
                  type="time"
                  value={time || ''}
                  className="form-control"
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>客户</label>
            <input
              type="text"
              value={client || ''}
              className="form-control"
              onChange={(event) => setClient(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>内容</label>
            <textarea
              value={content || ''}
              rows="3"
              className="form-control"
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => window.history.go(-1)}
            >
              返回
            </button>
          </div>

          <div className="btn-group pull-right">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              <i className="fa fa-fw fa-save" />
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
