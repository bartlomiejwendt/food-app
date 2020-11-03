import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "./components/Home/Home";

import { Login } from "./components/Auth/Login/Login";
import { Signup } from "./components/Auth/Signup/Signup";

import { PrivateRoute } from "./routes/PrivateRoute";
import { PreventRoute } from "./routes/PreventRoute";
import { ErrorRoute } from "./routes/ErrorRoute/ErrorRoute";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>

        <PreventRoute path="/login">
          <Login />
        </PreventRoute>

        <PreventRoute path="/signup">
          <Signup />
        </PreventRoute>

        <Route component={ErrorRoute} />
      </Switch>
    </>
  );
};

export default App;
