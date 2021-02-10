import React from "react";
import "./basket.scss";
import { useDispatch, useTrackedState } from "../../store/store";

import firebase from "firebase/app";
import "firebase/firestore";

import { BasketItem } from "./BasketItem/BasketItem";

import { EnvironmentOutlined } from "@ant-design/icons";
import { message } from "antd";

export const Basket: React.FC = () => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { basket } = state;

  const currentUser = JSON.parse(localStorage.getItem("authUser")!);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { uid } = currentUser;

    const database = firebase.firestore();
    const userRef = database.collection("users").doc(uid).collection("history");
    
    if (basket.length) {
      userRef.add({
       items: basket,
       date: new Date()
      })

      dispatch({ type: "RESET_BASKET" });
      message.success("You have successfully bought items");
    } else {
      message.error("Your basket is empty!");
    }
  }

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

        <button className="basket__checkout" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};
