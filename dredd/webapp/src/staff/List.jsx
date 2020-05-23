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

      <div className="card bg-dark shadow">
        <div className="card-body">
          <table className="table table-dark table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>状态</th>
                <th>姓名</th>
                <th>EMAIL</th>
                <th>电话</th>
              </tr>
            </thead>

            <tbody>
              {staff_list.map((it) => (
                <tr key={it.id}>
                  <td className="text-right">
                    <span className="pull-left">
                      <a href={`#/${it.id}?uuid=${it.uuid}`}>
                        <i className="fa fa-fw fa-edit" />
                      </a>
                    </span>
                    {it.id}
                  </td>
                  <td>
                    {it.certified === true ? (
                      <span className="badge badge-success">已认证</span>
                    ) : (
                      <span className="badge badge-danger">未认证</span>
                    )}
                  </td>
                  <td>{it.name}</td>
                  <td>{it.email}</td>
                  <td>{it.tel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
