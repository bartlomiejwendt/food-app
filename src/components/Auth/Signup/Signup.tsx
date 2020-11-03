import React from "react";
import "./signup.scss";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { Checkbox, message } from "antd";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";

interface inputValuesTypes {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export const Signup: React.FC = () => {
  const history = useHistory();
  const [inputValues, setInputValues] = React.useState<inputValuesTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const handleUpdateInputValues = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setInputValues((prevState: inputValuesTypes): inputValuesTypes => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCreateNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = inputValues;

    const database = firebase.firestore();
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, password).then((newUserRef) => {
      if (newUserRef.user !== null) {
        database.collection("users").doc(newUserRef.user.uid).set({
          uid: newUserRef.user.uid,
          fullName: firstName + " " + lastName,
          firstName,
          lastName,
          email,
          avatar: null,
          joined: new Date()
        })

        history.push("/login");
        message.success("Account created successfully! You can Login now.");
      }
    }, 
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode) {
        message.error(errorMessage);
      }

      console.error(errorCode, errorMessage);
    })
  }

  return (
    <div className="signup">
      <div className="signup__banner">
        <h1 className="signup__title">Orderify.</h1>
      </div>
      <div className="signup__create">
        <form className="signup__form"
          onChange={(e) => handleUpdateInputValues(e)}
          onSubmit={(e) => handleCreateNewUser(e)}
        >
          <header className="signup__form-header">
            <h1 className="signup__form-title">Get started</h1>
            <CloseOutlined
              onClick={() => history.push("/login")}
              style={{ fontSize: "1.25rem", cursor: "pointer" }}
            />
          </header>

          <div className="signup__identity">
            <input
              className="signup__input signup__name"
              required
              type="text"
              name="firstName"
              minLength={2}
              maxLength={24}
              autoCapitalize="on"
              placeholder="First name"
            />

            <input
              className="signup__input signup__last-name"
              required
              type="text"
              name="lastName"
              minLength={2}
              maxLength={24}
              autoCapitalize="on"
              placeholder="Last name"
            />
          </div>

          <div className="signup__email">
            <input
              className="signup__input signup__email"
              required
              type="email"
              name="email"
              placeholder="Email address"
            />
          </div>

          <div className="signup__password">
            <input
              className="signup__input signup__password"
              required
              type="password"
              name="password"
              minLength={6}
              maxLength={32}
              placeholder="Password"
            />
          </div>

          <div className="signup__terms">
            <Checkbox>
              {" "}
              I agree to
              <span className="signup--blue"> Terms of Service </span>
              and
              <span className="signup--blue"> Privacy policy</span>
            </Checkbox>
          </div>

          <button className="signup__button">
            <span className="sigunp__button-text">Create free account</span>
            <ArrowRightOutlined />
          </button>
        </form>
      </div>
    </div>
  );
};
