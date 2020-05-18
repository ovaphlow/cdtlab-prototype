import React from 'react'

export function Address(props) {
  return (
    <>
      <div className="row">
        <div className="col">
          <label>地址</label>
          <input type="text" value={props.address_level1 || ''}
            className="form-control"
            onChange={props.onAddressLevel1Change}
          />
        </div>
        <div className="col">
          <input type="text" value={props.address_level2 || ''}
            className="form-control"
            onChange={props.onAddressLevel2Change}
          />
        </div>
        <div className="col">
          <input type="text" value={props.address_level3 || ''}
            className="form-control"
            onChange={props.onAddressLevel3Change}
          />
        </div>
      </div>

      <div className="form-group">
        <input type="text" value={props.address_level4 || ''}
          className="form-control"
          onChange={props.onAddressLevel4Change}
        />
      </div>
    </>
  )
}
