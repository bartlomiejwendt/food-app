import React from "react";
import { Route, Redirect } from "react-router-dom";

// This route prevents ALREADY LOGGED USERS from accessing pages
// Such as Login or Signup

export const PreventRoute = ({ children, ...rest }) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authToken ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};