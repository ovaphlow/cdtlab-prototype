import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function List() {
  const [customer_list, setCustomerList] = useState([]);
  const [filter_name, setFilterName] = useState('');

  const handleFilter = async () => {
    setCustomerList([]);
    let res = await window.fetch('/api/customer/', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ filter_name }),
    });
    res = await res.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    setCustomerList(res.content);
  };

  useEffect(() => {
    (async () => {
      let res = await window.fetch('/api/customer/');
      res = await res.json();
      setCustomerList(res.content);
    })();
  }, []);

  return (
    <div className="container">
      <h1>CUSTOMER</h1>
      <hr />

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">
              <i className="fa fa-fw fa-home" />
              HOME
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            CUSTOMER
          </li>
        </ol>
      </nav>

      <div className="btn-group pull-right">
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={() => window.location = '#/新增'}
        >
          <i className="fa fa-fw fa-plus" />
          新增
        </button>
      </div>

      <div className="clearfix m-2" />

      <div className="card shadow">
        <div className="card-header">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">名称/电话</span>
            </div>
            <input
              type="text"
              name={filter_name || ''}
              className="form-control"
              onChange={(event) => setFilterName(event.target.value)}
            />
          </div>

          <div className="mt-2">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => window.location.reload(true)}
              >
                <i className="fa fa-fw fa-refresh" />
                重置
              </button>
            </div>

            <div className="btn-group pull-right">
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                onClick={handleFilter}
              >
                <i className="fa fa-fw fa-search" />
                查询
              </button>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="list-group">
            {customer_list.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {it.name}
                  </h5>
                  <small>
                    电话：
                    {it.tel}
                  </small>
                </div>
                <ul className="list-inline mb-1">
                  地址：
                  <li className="list-inline-item">{it.address_level1}</li>
                  <li className="list-inline-item">{it.address_level2}</li>
                  <li className="list-inline-item">{it.address_level3}</li>
                  <li className="list-inline-item">{it.address_level4}</li>
                </ul>
                <small>
                  添加于：
                  {moment(it.created_at).format('YYYY-MM-DD')}
                </small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
