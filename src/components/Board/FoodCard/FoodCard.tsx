import React from "react";
import "./foodcard.scss";
import { useHistory, useLocation } from "react-router-dom";

import { useDispatch, useTrackedState, foodTypes } from "../../../store/store";

import { message } from "antd";
import { CloseOutlined, InfoCircleOutlined, PlusCircleOutlined, StarFilled } from "@ant-design/icons";

interface Props {
  category: string;
  databaseId: string,
  description: string;
  name: string;
  opinions: any[];
  photos: string[];
  price: number;
  restaurant: {
    id: string;
    name: string;
  };
}

export const FoodCard: React.FC<Props> = (props) => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const state = useTrackedState();
  const { basket } = state;
  
  const [isInBasket, setIsInBasket] = React.useState<boolean>(false);
  
  const handleAddToBasket = (item: foodTypes) => {
    dispatch({ type: "ADD_TO_BASKET", item })
    message.success("Item added to your basket");

    setIsInBasket(true);
  }
  
  const handleRemoveFromBasket = (id: string) => {
    dispatch({ type: "REMOVE_FROM_BASKET", id })
    message.error("Item removed from your basket");

    setIsInBasket(false);
  }
  
  React.useEffect(() => {
    const { databaseId } = props;

    const findInBasket = basket.find((el) => el.databaseId === databaseId);

    findInBasket ? setIsInBasket(true) : setIsInBasket(false);
  }, [basket, props])
  
  const { category, name, restaurant, price, photos, databaseId } = props;

  return (
    <div className="foodcard">
      <div className="foodcard__display">
        <img
          src={photos[0]}
          alt="food"
          className="foodcard__img"
        />

        <div className="foodcard__overlay">
          <span className="foodcard__price">${price}</span>
          <span className="foodcard__icon">
            <InfoCircleOutlined onClick={() => history.push(`/product/${databaseId}`, { from: location.pathname })}/>
          </span>
          <span className="foodcard__icon">
            {
              isInBasket ? (
                <CloseOutlined onClick={() => handleRemoveFromBasket(databaseId)} />
                ) : (
                <PlusCircleOutlined onClick={() => handleAddToBasket({...props, quantity: 1})}/>
              )
            }
          </span>
        </div>

      </div>

      <div className="foodcard__about">
        <h3>{name}</h3>
        <div className="foodcard__info">
          <div className="foodcard__rating">
            <StarFilled className="foodcard__star" />
            <span className="foodcard__rating-score">5</span>
          </div>

          <span className="foodcard__restaurant">• {restaurant.name} •</span>
          <span className="foodcard__category">{category}</span>
        </div>
      </div>
    </div>
  );
};
