import React from "react";
import "./historyitem.scss";

import moment from "moment";

import { Collapse } from "antd";
import { BasketItem } from "../../Basket/BasketItem/BasketItem";

interface Props {
  items: any[];
  date: any;
}

export const HistoryItem: React.FC<Props> = ({ items, date }) => {
  return (
    <div className="historyitem">
      <Collapse>
        <Collapse.Panel header={moment.unix(date.seconds).fromNow()} key={0}>
          {items.map((el, idx) => (
            <BasketItem {...el} key={idx} />
          ))}
          <div className="historyitem__total">
            <h2 className="historyitem__total-heading">Total: </h2>
            <span className="historyitem__amount">${ items.reduce((current, next) => current + next.price, 0) }</span>
          </div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
