import React from "react";
import "./card.scss";
import { useDispatch, useTrackedState } from "../../../store/store";

interface Props {
  id: number,
  iconUrl: string,
  name: string
}

export const Card: React.FC<Props> = (props) => {
  const state = useTrackedState();
  const dispatch = useDispatch();
  const { iconUrl, name } = props;
  const { category } = state;

  const handleSetCategory = (name: string) => {
    dispatch({ type: "SET_CATEGORY", name })
  }

  const isSelected = {
    border: "2px solid rgb(69, 194, 134)",
    background: "rgb(243, 254, 246)"
  }

  return (
    <div className="card" 
      onClick={() => handleSetCategory(name)} 
      style={ category.toLowerCase() === name.toLowerCase() ? isSelected : {} }
    >
      <img
        src={iconUrl}
        alt="card category"
        className="card__img"
      />
      <span className="card__name">{name}</span>
    </div>
  );
};
