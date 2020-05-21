import React, { useEffect, useState } from 'react';
import {
  useParams, useLocation,
} from 'react-router-dom';

export default function Detail(props) {
  const { category } = props;
  const { staff_id } = useParams();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [certified, setCertified] = useState('0');

  const handleSave = async () => {
    if (!email || !name) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      email,
      name,
      certified: certified === '1',
    };

    let res = await window.fetch(`/api/staff/${staff_id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
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
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;

    let res = await window.fetch(`/api/staff/${staff_id}?uuid=${new URLSearchParams(location.search).get('uuid')}`, {
      method: 'DELETE',
    });
    res = await res.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  useEffect(() => {
    if (category === '编辑') {
      (async (id, uuid) => {
        let res = await window.fetch(`/api/staff/${id}?uuid=${uuid}`);
        res = await res.json();
        setEmail(res.content.email);
        setName(res.content.name);
        setCertified(res.content.certified ? '1' : '0');
      })(staff_id, new URLSearchParams(location.search).get('uuid'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h1>STAFF</h1>
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
            <a href="#/">
              STAFF
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {category}
          </li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="card-body">
          <div className="form-group">
            <label>EMAIL</label>
            <input
              type="email"
              value={email || ''}
              autoComplete="email"
              className="form-control"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>姓名</label>
                <input
                  type="text"
                  value={name || ''}
                  className="form-control"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>
                  电话
                  <span className="text-danger">(未实现)</span>
                </label>
                <input
                  type="tel"
                  value={tel || ''}
                  className="form-control"
                  onChange={(event) => setTel(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>认证</label>
                <select
                  value={certified ? '1' : '0'}
                  className="form-control"
                  onChange={(event) => setCertified(event.target.value)}
                >
                  <option value="0">否</option>
                  <option value="1">是</option>
                </select>
              </div>
            </div>
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
              className="btn btn-outline-danger"
              onClick={handleRemove}
            >
              <i className="fa fa-fw fa-trash-o" />
              删除
            </button>

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
