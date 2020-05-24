import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function List({ customer_id }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await window.fetch(`/api/customer-payment/?customer_id=${customer_id}`);
      res = await res.json();
      setList(res.content);
    })();
  }, []);

  return (
    <table className="table table-dark table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>日期</th>
          <th>类别</th>
          <th>金额</th>
          <th>生效日期</th>
          <th>失效日期</th>
          <th>备注</th>
        </tr>
      </thead>

      <tbody>
        {list.map((it) => (
          <tr key={it.id}>
            <td className="text-right">
              <span className="pull-left">
                <a href={`customer-payment.html#/${it.id}?uuid=${it.uuid}`}>
                  <i className="fa fa-fw fa-edit" />
                </a>
              </span>
              {it.id}
            </td>
            <td>{moment(it.date).format('YYYY-MM-DD')}</td>
            <td>{it.category}</td>
            <td>{it.amount / 100}</td>
            <td>{moment(it.date0).format('YYYY-MM-DD')}</td>
            <td>
              <span className="badge badge-info">{moment(it.date1).fromNow()}</span>
              {moment(it.date1).format('YYYY-MM-DD')}
            </td>
            <td>{it.remark}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

List.propTypes = {
  customer_id: PropTypes.string.isRequired,
};
