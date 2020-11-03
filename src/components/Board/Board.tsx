import React from "react";
import "./board.scss";

import { Row, Col } from "antd";
import { FoodCard } from "./FoodCard/FoodCard";

export const Board: React.FC = () => {
  return (
    <div className="board">
      <h2 className="board__title">Popular from selected category</h2>

      <section className="board__items">
        <Row>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
          <Col xs={24} md={12} lg={12} xl={6}>
            <FoodCard />
          </Col>
        </Row>
      </section>

      <span className="board__browse">Browse all</span>
    </div>
  );
};
