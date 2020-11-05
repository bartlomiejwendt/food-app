import React from "react";
import "./home.scss";

import firebase from "firebase/app";
import "firebase/firestore";

import { Header } from "../Header/Header";
import { Categories } from "../Categories/Categories";
import { Board } from "../Board/Board";

interface foodTypes {
  category: string,
  databaseId: string,
  description: string,
  name: string,
  opinions: any[],
  photos: string[];
  price: number,
  restaurant: {
    id: string,
    name: string
  }
}

export const Home: React.FC = () => {
  const [food, setFood] = React.useState<foodTypes[]>([]);

  React.useEffect(() => {
    const database = firebase.firestore();
    const foodRef = database.collection("foods"); // THIS COLLECTION IS TEMPORARY AND NAME WILL CHANGE

    let fillArray: Array<any> = [];

    const unsubscribe = foodRef.onSnapshot((querySnapshot) => {
      querySnapshot.docs.forEach((food) => {
        fillArray.push({ ...food.data(), databaseId: food.id });
      })

      setFood(fillArray);
    })

    return () => unsubscribe();
  }, [])

  return (
    <div className="home">
      <div className="home__inner">
        <Header />
        <Categories />
        <Board food={food} />
      </div>
    </div>
  );
};