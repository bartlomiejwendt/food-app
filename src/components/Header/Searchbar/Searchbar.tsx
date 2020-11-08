import React from "react";
import "./searchbar.scss";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

import { SearchOutlined } from "@ant-design/icons";

interface foodTypes {
  name: string,
  databaseId: string
}

export const Searchbar: React.FC = () => {
  const history = useHistory();
  const [food, setFood] = React.useState<foodTypes[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleUpdateTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = (term: string) => {
    return (food: any) => {
      return food.name.toLowerCase().includes(term.toLowerCase()) || !term;
    }
  }

  React.useEffect(() => {
    const database = firebase.firestore();
    const foodRef = database.collection("foods");

    const unsubscribe = foodRef.onSnapshot((querySnapshot) => {
      const fillArray: any[] = [];

      querySnapshot.docs.forEach((doc) => {
        fillArray.push({
          name: doc.data().name,
          databaseId: doc.id
        })
      })

      setFood(fillArray);
    })

    return () => unsubscribe();
  }, [])

  return (
    <form className="searchbar" onBlur={() => setSearchTerm("")}>
      <input type="text" className="searchbar__input" placeholder="Search" onChange={(e) => handleUpdateTerm(e)} />
      <SearchOutlined className="searchbar__icon" />

      <ul className="searchbar__list" style={ searchTerm ? { display: "flex" } : { display: "none" }}>
        {
          searchTerm ? (
            food.filter(handleSearch(searchTerm)).slice(0, 6).map((data) => (
              <li className="searchbar__item" key={data.databaseId} onMouseDown={() => history.push(`/product/${data.databaseId}`, { from: "/" })}>{data.name}</li>
            ))
          ) : (null)
        }
      </ul>
    </form>
  );
};
