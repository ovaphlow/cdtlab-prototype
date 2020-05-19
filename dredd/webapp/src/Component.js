import React, { useEffect, useState } from 'react'

import { address } from './address'

function useKeys() {
  return Object.keys(address)
}

function useValues() {
  return Object.values(address)
}

export function AddressLevel1Picker(props) {
  const [list, setList] = useState([])
  const keys = useKeys()
  const values = useValues()

  useEffect(() => {
    // const keys = Object.keys(address)
    // const values = Object.values(address)
    let _arr = []
    keys.forEach((e, index) => {
      if (e.slice(-4) === '0000') {
        _arr.push(values[index])
      }
    })
    setList(_arr)
  }, [])

  return (
    <div className="form-group">
      <label>地址</label>
      <input type="text" value={props.value || ''} list="component.datalist.address-level1"
        placeholder="省、自治区、直辖市"
        className="form-control"
        onChange={props.onChange}
      />
      <datalist id="component.datalist.address-level1">
        {list.map((it, index) => (
          <option key={index}>{it}</option>
        ))}
      </datalist>
    </div>
  )
}

export function AddressLevel2Picker(props) {
  const [list, setList] = useState([])
  const keys = useKeys()
  const values = useValues()

  useEffect(() => {
    if (props.address_level1) {
      let _al1code = ''
      for (let i = 0; i < values.length; i++) {
        if (values[i] === props.address_level1) {
          _al1code = keys[i]
          break
        }
      }
      let _arr = []
      for (let i = 0; i < values.length; i++) {
        if (keys[i].slice(0, 2) === _al1code.slice(0, 2) && keys[i].slice(-2) === '00') {
          if (keys[i].slice(-4) !== '0000') _arr.push(values[i])
        }
      }
      setList(_arr)
    }
  }, [])

  return (
    <div className="form-group">
      <label>&nbsp;</label>
      <input type="text" value={props.value || ''} list="component.datalist.address-level2"
        placeholder="市"
        className="form-control"
        onChange={props.onChange}
      />
      <datalist id="component.datalist.address-level2">
        {list.map((it, index) => (
          <option key={index}>{it}</option>
        ))}
      </datalist>
    </div>
  )
}

export function AddressLevel3Picker(props) {
  const [list, setList] = useState([])
  const keys = useKeys()
  const values = useValues()

  useEffect(() => {
    if (props.address_level2) {
      let al2code = ''
      for (let i = 0; i < values.length; i++) {
        if (values[i] === props.address_level2 && keys[i].slice(-4) !== '0000') {
          al2code = keys[i]
          break
        }
      }
      let _arr = []
      for (let i = 0; i < values.length; i++) {
        if (keys[i].slice(0, 4) === al2code.slice(0, 4) && keys[i].slice(-2) !== '00') {
          _arr.push(values[i])
        }
      }
      setList(_arr)
    }
  }, [])

  return (
    <div className="form-group">
      <label>&nbsp;</label>
      <input type="text" value={props.value || ''} list="component.datalist.address-level3"
        placeholder="区"
        className="form-control"
        onChange={props.onChange}
      />
      <datalist id="component.datalist.address-level3">
        {list.map((it, index) => (
          <option key={index}>{it}</option>
        ))}
      </datalist>
    </div>
  )
}

export function AddressLevel4Picker(props) {
  return (
    <div className="form-group mt-3">
      <input type="text" value={props.value || ''}
        placeholder="详细地址"
        className="form-control"
        onChange={props.onChange}
      />
    </div>
  )
}
