import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v5 as uuidv5 } from 'uuid';

import JournalList from '../customer-journal/component/List';
import PaymentList from '../customer-payment/component/List';
import {
  AddressLevel1Picker, AddressLevel2Picker, AddressLevel3Picker, AddressLevel4Picker,
} from '../component/AddressPicker';

export default function Detail({ category }) {
  const { customer_id } = useParams();
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [address_level1, setAddressLevel1] = useState('');
  const [address_level2, setAddressLevel2] = useState('');
  const [address_level3, setAddressLevel3] = useState('');
  const [address_level4, setAddressLevel4] = useState('');

  const handleSave = async () => {
    if (!name) {
      window.alert('请完整填写所需信息');
      return;
    }

    const data = {
      uuid: uuidv5(name, uuidv5.DNS),
      name,
      tel,
      address_level1,
      address_level2,
      address_level3,
      address_level4,
    };

    if (category === '新增') {
      let res = await window.fetch('/api/customer/', {
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
      let res = await window.fetch(`/api/customer/${customer_id}`, {
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
        let res = await window.fetch(`/api/customer/${customer_id}`);
        res = await res.json();
        setName(res.content.name);
        setTel(res.content.tel);
        setAddressLevel1(res.content.address_level1);
        setAddressLevel2(res.content.address_level2);
        setAddressLevel3(res.content.address_level3);
        setAddressLevel4(res.content.address_level4);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

          <li className="breadcrumb-item">
            <a href="#/">
              CUSTOMER
            </a>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {category}
          </li>
        </ol>
      </nav>

      <div className="card bg-dark shadow">
        <div className="card-header">
          <span className="lead mb-0">
            CUSTOMER -
            {name}
          </span>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>名称</label>
                <input
                  type="text"
                  value={name || ''}
                  required
                  className="form-control"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="col-4">
              <div className="form-group">
                <label>电话</label>
                <input
                  type="tel"
                  value={tel || ''}
                  className="form-control"
                  onChange={(event) => setTel(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <AddressLevel1Picker
                caption="地址"
                value={address_level1 || ''}
                onChange={(event) => {
                  setAddressLevel1(event.target.value);
                  setAddressLevel2('');
                  setAddressLevel3('');
                }}
              />
            </div>

            <div className="col">
              {address_level1 && (
                <AddressLevel2Picker
                  value={address_level2 || ''}
                  address_level1={address_level1 || ''}
                  onChange={(event) => {
                    setAddressLevel2(event.target.value);
                    setAddressLevel3('');
                  }}
                />
              )}
            </div>

            <div className="col">
              {address_level2 && (
                <AddressLevel3Picker
                  value={address_level3 || ''}
                  address_level2={address_level2 || ''}
                  onChange={(event) => setAddressLevel3(event.target.value)}
                />
              )}
            </div>
          </div>

          <AddressLevel4Picker
            value={address_level4 || ''}
            onChange={(event) => setAddressLevel4(event.target.value)}
          />
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-secondary" onClick={() => { window.history.go(-1); }}>
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

      {category === '编辑' && (
        <div className="card bg-dark shadow mt-4">
          <div className="card-header">
            <span className="lead mb-0">沟通记录</span>
            <div className="btn-group pull-right">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => { window.location = `customer-journal.html#/新增?customer_id=${customer_id}`; }}
              >
                <i className="fa fa-fw fa-plus" />
                沟通记录
              </button>
            </div>
          </div>

          <div className="card-body">
            <JournalList customer_id={customer_id} />
          </div>
        </div>
      )}

      {category === '编辑' && (
        <div className="card bg-dark shadow mt-4">
          <div className="card-header">
            <span className="lead mb-0">付款记录</span>
            <div className="btn-group pull-right">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => { window.location = `customer-payment.html#/新增?customer_id=${customer_id}`; }}
              >
                <i className="fa fa-fw fa-plus" />
                付款记录
              </button>
            </div>
          </div>

          <div className="card-body">
            <PaymentList customer_id={customer_id} />
          </div>
        </div>
      )}
    </div>
  );
}

Detail.propTypes = {
  category: PropTypes.string.isRequired,
};
