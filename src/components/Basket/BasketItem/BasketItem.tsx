import React from "react";
import "./basketitem.scss";
import { useDispatch, foodTypes } from "../../../store/store";

import { CloseCircleOutlined } from "@ant-design/icons";


export const BasketItem: React.FC<foodTypes> = (props) => {
  const dispatch = useDispatch();
  const { quantity, photos, price, name, databaseId } = props;

  const handleRemoveFromBasket = (id: string) => {
    dispatch({ type: "REMOVE_FROM_BASKET", id });
  }

  return (
    <div className="basket-item">
      <div className="basket-item__display">
        <img
          src={photos[0]}
          alt="basket item"
          className="basket-item__img"
        />
        <div className="basket-item__overlay">
          <span className="basket-item__icon" onClick={() => handleRemoveFromBasket(databaseId)}>
            <CloseCircleOutlined />
          </span>
        </div>
      </div>

      <div className="basket-item__info">
        <div>
          <span className="basket-item__count">{quantity}</span>
          <span className="basket-item__x">x</span>
          <span className="basket-item__title">{name}</span>
        </div>
        <div>
          <span className="basket-item__price">${(price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
