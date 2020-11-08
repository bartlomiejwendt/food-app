import React from "react";
import "./userhistory.scss";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

import { CloseOutlined } from "@ant-design/icons";
import { HistoryItem } from "./HistoryItem/HistoryItem";

export const UserHistory: React.FC = () => {
  const history = useHistory();
  const [userHistory, setUserHistory] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("authUser")!);
    const { uid } = currentUser;

    const database = firebase.firestore();
    const historyRef = database.collection("users").doc(uid).collection("history");

    const unsubscribe = historyRef.onSnapshot((querySnapshot) => {
      let fillArray: any[] = [];

      if (querySnapshot.docs) {
        const historyItems = querySnapshot.docs

        historyItems.forEach((el) => {
          fillArray.push(el.data());
        })

        setUserHistory(fillArray);
      }
    })

    return () => unsubscribe();
  }, [])


  return (
    <div className="userhistory">
      <header className="userhistory__header">
        <h1 className="userhistory__title">History</h1>
        <CloseOutlined className="userhistory__close" onClick={() => history.push("/")} />
      </header>

      <div className="userhistory__list">
        {
          userHistory.length ? (
            userHistory.sort((a, b) => b.date - a.date).map((el, idx) => (
              <HistoryItem {...el} key={idx} />
            ))
          ) : ("You did not buy anything yet.")
        }
      </div>
    </div>
  );
};
