import React from "react";
import "./card.scss";

export const Card: React.FC = () => {
  return (
    <div className="card">
      <img
        src="https://image.flaticon.com/icons/svg/135/135763.svg"
        alt="card category"
        className="card__img"
      />
      <span className="card__name">All</span>
    </div>
  );
};
