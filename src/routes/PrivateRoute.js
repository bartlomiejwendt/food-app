import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
