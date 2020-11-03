import React from "react";
import "./categories.scss";

import ScrollContainer from "react-indiana-drag-scroll";
import { Card } from "./Card/Card";

export const Categories: React.FC = () => {
  return (
    <ScrollContainer className="categories__scroll-container">
      <div className="categories">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </ScrollContainer>
  );
};
