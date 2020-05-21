import React, { useEffect, useState } from 'react';

export default function List() {
  const [staff_list, setStaffList] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await window.fetch('/api/staff/');
      res = await res.json();
      setStaffList(res.content);
    })();
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
            STAFF
          </li>
        </ol>
      </nav>

      <div className="card shadow">
        <div className="card-body">
          <div className="list-group">
            {staff_list.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}?uuid=${it.uuid}`}
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {it.certified === false && (
                      <>
                        <span className="badge badge-danger">未认证</span>
                        &nbsp;
                      </>
                    )}
                    {it.name}
                  </h5>
                  <small>{it.email}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
