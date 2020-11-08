import React from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import { message } from "antd";

interface inputValuesTypes {
  email: string,
  password: string
}

export const Login: React.FC = () => {
  const history = useHistory();

  const [inputValues, setInputValues] = React.useState<inputValuesTypes>({
    email: "",
    password: ""
  });

  const handleUpdateInputValues = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setInputValues((prevState: inputValuesTypes): inputValuesTypes => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLoginToAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = inputValues;

    const database = firebase.firestore();
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, password).then((loginUserRef) => {
      const userRef = database.collection("users").doc(loginUserRef?.user?.uid);

      userRef.get().then((doc) => {
        if (doc.exists) {
          auth.currentUser?.getIdToken(true).then((idToken) => {
            localStorage.setItem("authToken", JSON.stringify(idToken));
            
            const userData = doc.data();
            localStorage.setItem("authUser", JSON.stringify(userData));
  
            message.success("Login successful");
            history.push("/")
          }).catch((error) => {
            console.error(error);
          })
        }
      })
    }, (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode) {
        message.error(errorMessage);
      }

      console.error(errorCode, errorMessage);
    })
  }

  return (
    <div className="login">
      <div className="login__banner">
        <div className="login__heading">
          <span className="login__order">Order</span>
          <span>something.</span>
        </div>
      </div>

      <div className="login__enter">
        <div className="login__form-wrapper">
          <h1>Orderify.</h1>

          <form className="login__form"
            onChange={(e) => handleUpdateInputValues(e)}
            onSubmit={(e) => handleLoginToAccount(e)}
          >
            <div className="login__welcome">
              <h2>Welcome back!</h2>
              <span>Log in to continue</span>
            </div>

            <div className="login__inputs">
              <input
                className="login__input"
                required
                type="email"
                name="email"
                placeholder="Email address"
              />

              <input
                className="login__input"
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <div className="login__buttons">
              <button className="login__button login__signin">Login</button>
              <button
                className="login__button login__signup"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/signup");
                }}
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
