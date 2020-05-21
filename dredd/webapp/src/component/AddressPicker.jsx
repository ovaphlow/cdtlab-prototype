import React, { useEffect, useState } from 'react';

import { address } from '../address';

function useKeys() {
  return Object.keys(address);
}

function useValues() {
  return Object.values(address);
}

export function AddressLevel1Picker(props) {
  const { value, onChange } = props;
  const [list, setList] = useState([]);
  const keys = useKeys();
  const values = useValues();

  useEffect(() => {
    const arr = [];
    keys.forEach((e, index) => {
      if (e.slice(-4) === '0000') {
        arr.push(values[index]);
      }
    });
    setList(arr);
  }, []);

  return (
    <div className="form-group">
      <label>地址</label>
      <input
        type="text"
        value={value || ''}
        list="component.datalist.address-level1"
        placeholder="省、自治区、直辖市"
        className="form-control"
        onChange={onChange}
      />
      <datalist id="component.datalist.address-level1">
        {list.map((it) => (
          <option key={list.indexOf(it)}>{it}</option>
        ))}
      </datalist>
    </div>
  );
}

export function AddressLevel2Picker(props) {
  const { value, onChange } = props;
  const [list, setList] = useState([]);
  const keys = useKeys();
  const values = useValues();

  useEffect(() => {
    if (props.address_level1) {
      let al1code = '';
      for (let i = 0; i < values.length; i += 1) {
        if (values[i] === props.address_level1) {
          al1code = keys[i];
          break;
        }
      }
      const arr = [];
      for (let i = 0; i < values.length; i += 1) {
        if (keys[i].slice(0, 2) === al1code.slice(0, 2) && keys[i].slice(-2) === '00') {
          if (keys[i].slice(-4) !== '0000') arr.push(values[i]);
        }
      }
      setList(arr);
    }
  }, []);

  return (
    <div className="form-group">
      <label>&nbsp;</label>
      <input
        type="text"
        value={value || ''}
        list="component.datalist.address-level2"
        placeholder="市"
        className="form-control"
        onChange={onChange}
      />
      <datalist id="component.datalist.address-level2">
        {list.map((it) => (
          <option key={list.indexOf(it)}>{it}</option>
        ))}
      </datalist>
    </div>
  );
}

export function AddressLevel3Picker(props) {
  const { value, onChange, address_level2 } = props;
  const [list, setList] = useState([]);
  const keys = useKeys();
  const values = useValues();

  useEffect(() => {
    if (address_level2) {
      let al2code = '';
      for (let i = 0; i < values.length; i += 1) {
        if (values[i] === address_level2 && keys[i].slice(-4) !== '0000') {
          al2code = keys[i];
          break;
        }
      }
      const arr = [];
      for (let i = 0; i < values.length; i += 1) {
        if (keys[i].slice(0, 4) === al2code.slice(0, 4) && keys[i].slice(-2) !== '00') {
          arr.push(values[i]);
        }
      }
      setList(arr);
    }
  }, []);

  return (
    <div className="form-group">
      <label>&nbsp;</label>
      <input
        type="text"
        value={value || ''}
        list="component.datalist.address-level3"
        placeholder="区"
        className="form-control"
        onChange={onChange}
      />
      <datalist id="component.datalist.address-level3">
        {list.map((it) => (
          <option key={list.indexOf(it)}>{it}</option>
        ))}
      </datalist>
    </div>
  );
}

export function AddressLevel4Picker(props) {
  const { value, onChange } = props;

  return (
    <div className="form-group mt-3">
      <input
        type="text"
        value={value || ''}
        placeholder="详细地址"
        className="form-control"
        onChange={onChange}
      />
    </div>
  );
}
