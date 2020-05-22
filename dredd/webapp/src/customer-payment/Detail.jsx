import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid';
import moment from 'moment';

export default function Detail(props) {
  const { cat } = props;
  const location = useLocation();
  const [amount, setAmount] = useState('0');
  const [date0, setDate0] = useState(moment().format('YYYY-MM-DD'));
  const [date1, setDate1] = useState(moment().add(1, 'y').format('YYYY-MM-DD'));
  const [category, setCategory] = useState('');
  const [remark, setRemark] = useState('');

  const handleSave = async () => {
    if (!amount || !category || !date0 || !date1) {
      window.alert('请完整填写所需信息');
      return;
    }

    const customer_id = new URLSearchParams(location.search).get('customer_id');
    const data = {
      uuid: uuidv5(`payment ${customer_id} ${new Date()}`, uuidv5.DNS),
      customer_id,
      category,
      amount: parseInt(amount, 10) * 100,
      date0,
      date1,
      remark,
    };

    if (cat === '新增') {
      let res = await window.fetch('/api/customer-payment/', {
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
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <h1>CUSTOMER PAYMENT</h1>
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
            PAYMENT
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {cat}
          </li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>类别</label>
                <input
                  type="text"
                  value={category || ''}
                  className="form-control"
                  onChange={(event) => setCategory(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>金额</label>
                <input
                  type="number"
                  value={amount || '0'}
                  className="form-control"
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>生效日期</label>
                <input
                  type="date"
                  value={date0 || ''}
                  className="form-control"
                  onChange={(event) => setDate0(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>失效日期</label>
                <input
                  type="date"
                  value={date1 || ''}
                  className="form-control"
                  onChange={(event) => setDate1(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <input
              type="text"
              value={remark || ''}
              className="form-control"
              onChange={(event) => setRemark(event.target.value)}
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => { window.history.go(-1); }}
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
