import React from "react";
import "./board.scss";
import { useHistory } from "react-router-dom";

import { Row, Col, Skeleton } from "antd";
import { FoodCard } from "./FoodCard/FoodCard";
import { useTrackedState } from "../../store/store";

interface foodTypes {
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

interface Props {
  food: foodTypes[];
}

export const Board: React.FC<Props> = ({ food }) => {
  const history = useHistory();
  const state = useTrackedState();

  const displayFood = () => {
    const { category } = state;

    if (category.toLowerCase() === "all") {
      return (
        food.slice(0, 8).map((el) => (
          <Col xs={24} md={12} lg={12} xl={6} key={el.databaseId}>
            <FoodCard {...el} />
          </Col>
        ))
      )
    } else {
        return (
          food
          .filter((el) => el.category.toLowerCase() === category.toLowerCase())
          .slice(0, 8)
          .map((el) => (
            <Col xs={24} md={12} lg={12} xl={6} key={el.databaseId}>
              <FoodCard {...el} />
            </Col>
          ))
        )
      }
  }

  return (
    <div className="board">
      <h2 className="board__title">Popular from selected category</h2>

      <section className="board__items">
        <Row>
          { food.length ? displayFood() : <Skeleton /> }
        </Row>
      </section>

      <span className="board__browse" onClick={() => history.push("/browse")}>
        Browse all
      </span>
    </div>
  );
};
