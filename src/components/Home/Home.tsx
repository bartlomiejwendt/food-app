import React from "react";
import "./home.scss";

import { Header } from "../Header/Header";
import { Categories } from "../Categories/Categories";
import { Board } from "../Board/Board";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__inner">
        <Header />
        <Categories />
        <Board />
      </div>
    </div>
  );
};
