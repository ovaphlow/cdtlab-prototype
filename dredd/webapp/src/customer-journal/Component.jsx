import React, { useEffect, useState } from 'react';
import moment from 'moment';

export function ListComponent(props) {
  const [customer_journal_list, setCustomerJournalList] = useState([]);

  useEffect(() => {
    (async (customer_id) => {
      let res = await window.fetch(`/api/customer-journal/?customer_id=${customer_id}`);
      res = await res.json();
      setCustomerJournalList(res.content);
    })(props.customer_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-group">
      {customer_journal_list.map((it) => (
        <a
          key={it.id}
          href={`customer-journal.html#/${it.id}?customer_id=${props.customer_id}`}
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">{it.staff}</h5>
          <small>{moment(it.datime).fromNow()}</small>
          <p className="mb-1">{it.client}</p>
        </a>
      ))}
    </div>
  );
}
