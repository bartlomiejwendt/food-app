import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { UserSettings } from "./components/UserSettings/UserSettings";
import { Browse } from "./components/Browse/Browse";

import { Login } from "./components/Auth/Login/Login";
import { Signup } from "./components/Auth/Signup/Signup";

import { PrivateRoute } from "./routes/PrivateRoute";
import { PreventRoute } from "./routes/PreventRoute";
import { ErrorRoute } from "./routes/ErrorRoute/ErrorRoute";
import { Provider } from "./store/store";

const App: React.FC = () => {
  return (
    <>
      <Provider>
        <Switch>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>

          <PrivateRoute path="/browse">
            <Browse />
          </PrivateRoute>

          <PrivateRoute path="/settings">
            <UserSettings />
          </PrivateRoute>

          <PreventRoute path="/login">
            <Login />
          </PreventRoute>

          <PreventRoute path="/signup">
            <Signup />
          </PreventRoute>

          <Route component={ErrorRoute} />
        </Switch>
      </Provider>
    </>
  );
};

export default App;
