import { EnvironmentOutlined } from "@ant-design/icons";
import React from "react";
import "./basket.scss";
import { useTrackedState } from "../../store/store";

import { BasketItem } from "./BasketItem/BasketItem";

export const Basket: React.FC = () => {
  const state = useTrackedState();
  const { basket } = state;

  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  React.useEffect(() => {
    const calculateTotalAmount = basket.reduce((prev, cur): number => {
      return prev + (cur.price * cur.quantity);
    }, 0)

    setTotalAmount(calculateTotalAmount);
  }, [basket])

  return (
    <div className="basket">
      <ul className="basket__list">
        {
          basket.length ? (
            basket.map((el) => (
              <BasketItem {...el} key={el.databaseId} />
            ))
          ) : (
            "Your basket is empty"
          )
        }
      </ul>

      <div className="basket__order-info">
        <div className="basket__delivery">
          <div className="basket__icon">
            <EnvironmentOutlined />
          </div>

          <div className="basket__time">
            <div className="basket__time-text">
              <span className="basket--bold">Delivery</span>
              <span className="basket__delivery-time">30-40 min</span>
            </div>
            <div className="basket__delivery-price">$5</div>
          </div>
        </div>

        <div className="basket__price">
          <span className="basket__total">Total amount: </span>
          <span className="basket__amount">${totalAmount + 5}</span>
        </div>

        <button className="basket__checkout">Checkout</button>
      </div>
    </div>
  );
};
