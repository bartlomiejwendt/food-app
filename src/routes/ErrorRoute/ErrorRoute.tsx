import React from "react";
import "./errorroute.scss";
import { useHistory } from "react-router-dom";

export const ErrorRoute: React.FC = () => {
  const history = useHistory();

  return (
    <div className="error-route">
      <h1 className="error-route__title">Orderify.</h1>

      <div className="error-route__back">
        <span className="error-route__404">404</span>
        <h2 className="error-route__missing">Something's missing.</h2>

        <button
          className="error-route__return"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
