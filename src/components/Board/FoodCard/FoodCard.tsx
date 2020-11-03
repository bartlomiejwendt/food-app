import { InfoCircleOutlined, PlusCircleOutlined, StarFilled } from "@ant-design/icons";
import React from "react";
import "./foodcard.scss";

export const FoodCard: React.FC = () => {
  return (
    <div className="foodcard">
      <div className="foodcard__display">
        <img
          src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
          alt="food"
          className="foodcard__img"
        />

        <div className="foodcard__overlay">
          <span className="foodcard__price">$19.99</span>
          <span className="foodcard__icon">
            <InfoCircleOutlined />
          </span>
          <span className="foodcard__icon">
            <PlusCircleOutlined />
          </span>
        </div>

      </div>

      <div className="foodcard__about">
        <h3>Name</h3>
        <div className="foodcard__info">
          <div className="foodcard__rating">
            <StarFilled className="foodcard__star" />
            <span className="foodcard__rating-score">5</span>
          </div>

          <span className="foodcard__restaurant">• Restaurant •</span>
          <span className="foodcard__category">Category</span>
        </div>
      </div>
    </div>
  );
};
