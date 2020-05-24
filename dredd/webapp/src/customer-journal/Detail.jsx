import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';
import moment from 'moment';

export default function Detail({ category }) {
  const { customer_journal_id } = useParams();
  const location = useLocation();
  const [staff_delegate, setStaffDelegate] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [customer_delegate, setCustomerDelegate] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!staff_delegate || !date || !time || !customer_delegate || !content) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(`${staff_delegate} ${date} ${time}`, uuidv5.DNS),
      staff_id: 0,
      staff_delegate,
      datime: `${date} ${time}`,
      customer_id: new URLSearchParams(location.search).get('customer_id'),
      customer_delegate,
      content,
    };

    if (category === '新增') {
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
    } else if (category === '编辑') {
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
    if (category === '编辑') {
      (async () => {
        let res = await window.fetch(`/api/customer-journal/${customer_journal_id}`);
        res = await res.json();
        setStaffDelegate(res.content.staff_delegate);
        setDate(moment(res.content.datime).format('YYYY-MM-DD'));
        setTime(moment(res.content.datime).format('HH:mm:ss'));
        setCustomerDelegate(res.content.customer_delegate);
        setContent(res.content.content);
      })();
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
            <span className="text-dark">JOURNAL</span>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {category}
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { window.history.go(-1); }}>
              返回
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="form-group">
            <label>职员</label>
            <input
              type="text"
              value={staff_delegate || ''}
              className="form-control"
              onChange={(event) => setStaffDelegate(event.target.value)}
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
              value={customer_delegate || ''}
              className="form-control"
              onChange={(event) => setCustomerDelegate(event.target.value)}
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
            <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
              返回
            </button>
          </div>

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-fw fa-save" />
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
