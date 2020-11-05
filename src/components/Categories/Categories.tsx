import React from "react";
import "./categories.scss";

import firebase from "firebase/app";
import "firebase/firestore";

import { Card } from "./Card/Card";
import { Skeleton } from "antd";
import ScrollContainer from "react-indiana-drag-scroll";

interface categoryTypes {
  id: number,
  iconUrl: string,
  name: string
}

export const Categories: React.FC = () => {
  const [categories, setCategories] = React.useState<categoryTypes[]>([]);

  React.useEffect(() => {
    const database = firebase.firestore();
    const categoriesRef = database.collection("categories");

    let fillArray: Array<any> = [];

    const unsubscribe = categoriesRef.onSnapshot((querySnapshot) => {
      querySnapshot.docs.forEach((category) => {
        fillArray.push(category.data());
      })

      setCategories(fillArray);
    })

    return () => unsubscribe();
  }, [])

  return (
    <ScrollContainer className="categories__scroll-container">
      <div className="categories">
        {
          categories.length ? (
            categories.sort((a, b) => a.id - b.id).map((category) => (
              <Card {...category} key={category.id} />
            ))
          ) : <Skeleton />
        }
      </div>
    </ScrollContainer>
  );
};
