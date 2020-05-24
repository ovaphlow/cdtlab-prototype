import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function List({ customer_id }) {
  const [customer_journal_list, setCustomerJournalList] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await window.fetch(`/api/customer-journal/?customer_id=${customer_id}`);
      res = await res.json();
      setCustomerJournalList(res.content);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <table className="table table-dark table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th className="text-right">序号</th>
          <th>日期</th>
          <th>员工</th>
          <th>客户代表</th>
          <th>内容</th>
        </tr>
      </thead>

      <tbody>
        {customer_journal_list.map((it) => (
          <tr key={it.id}>
            <td className="text-right">
              <span className="pull-left">
                <a href={`#customer-journal.html#/${it.id}?customer_id=${customer_id}?uuid=${it.uuid}`}>
                  <i className="fa fa-fw fa-edit" />
                </a>
                {it.id}
              </span>
            </td>
            <td>{it.datime} ({moment(it.datime).fromNow()})</td>
            <td>{staff_delegate}</td>
            <td>{it.customer_delegate}</td>
            <td>{it.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

List.propTypes = {
  customer_id: PropTypes.string.isRequired,
};
