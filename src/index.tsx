import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./scss/index.scss";
import "antd/dist/antd.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Config } from "./js/dbconfig";

import App from "./App";

firebase.initializeApp(Config);
firebase.firestore();
firebase.auth();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
