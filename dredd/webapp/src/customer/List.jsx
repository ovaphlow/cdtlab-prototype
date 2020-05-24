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
          className="btn btn-success btn-sm"
          onClick={() => { window.location = '#/新增'; }}
        >
          <i className="fa fa-fw fa-plus" />
          新增
        </button>
      </div>

      <div className="clearfix m-2" />

      <div className="card bg-dark shadow">
        <div className="card-header">
          <div className="form-row">
            <div className="col-auto">
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
            </div>

            <div className="col-auto">
              <div className="btn-group">
                <button type="button" className="btn btn-info" onClick={handleFilter}>
                  <i className="fa fa-fw fa-search" />
                  查询
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => { window.location.reload(true); }}>
                  <i className="fa fa-fw fa-refresh" />
                  重置
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-dark table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>名称</th>
                <th>电话</th>
                <th>地址</th>
                <th>添加于</th>
              </tr>
            </thead>

            <tbody>
              {customer_list.map((it) => (
                <tr key={it.id}>
                  <td className="text-right">
                    <span className="pull-left">
                      <a href={`#/${it.id}?uuid=${it.uuid}`}>
                        <i className="fa fa-fw fa-edit" />
                      </a>
                    </span>
                    {it.id}
                  </td>
                  <td>{it.name}</td>
                  <td>{it.tel}</td>
                  <td>
                    <ul className="list-inline">
                      <li className="list-inline-item">{it.address_level1}</li>
                      <li className="list-inline-item">{it.address_level2}</li>
                      <li className="list-inline-item">{it.address_level3}</li>
                      <li className="list-inline-item">{it.address_level4}</li>
                    </ul>
                  </td>
                  <td>{moment(it.created_at).format('YYYY-MM-DD')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
