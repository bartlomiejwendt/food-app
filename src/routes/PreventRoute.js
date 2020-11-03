import React from "react";
import { Route, Redirect } from "react-router-dom";

// This route prevents ALREADY LOGGED USERS from accessing pages
// Such as Login or Signup

export const PreventRoute = ({ children, ...rest }) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
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