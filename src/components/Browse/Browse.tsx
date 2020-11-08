import React from "react";
import "./browse.scss";
import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

import { User } from "../Header/User/User";
import { FoodCard } from "../Board/FoodCard/FoodCard";

import { Col, Row, Select, Skeleton, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type foodTypes = {
  category: string;
  databaseId: string;
  description: string;
  name: string;
  opinions: any[];
  photos: string[];
  price: number;
  restaurant: {
    id: string;
    name: string;
  };
};

type categoriesTypes = {
  id: number,
  name: string,
  iconUrl: string
}

type filterTypes = {
  type: "asc" | "desc",
  sortBy: "alphabetical" | "price" | "rating",
  category: string,
  price: [x: number, y: number]
}

export const Browse: React.FC = () => {
  const history = useHistory();

  const [displayAmount, setDisplayAmount] = React.useState<number>(4);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filters, setFilters] = React.useState<filterTypes>({
    type: "asc",
    sortBy: "price",
    category: "all",
    price: [0, 160]
  });

  const [food, setFood] = React.useState<foodTypes[]>([]);
  const [categories, setCategories] = React.useState<categoriesTypes[]>([]);

  const handleUpdateFilters = (key: 'type' | 'sortBy' | 'category' | 'price', value: any) => {
    setFilters((prevState): filterTypes => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleDisplayMore = () => {
    if (displayFood().length >= displayAmount) {
      setDisplayAmount((prevState) => prevState + 4);
    } else {
      setDisplayAmount(4);
    }
  }

  const handleUpdateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
  }

  const handleSortType = (a: any, b: any) => {
    const { sortBy } = filters;
    
    if (sortBy === "alphabetical") {
      return a.name < b.name ? -1 : 1
    } else if (sortBy === "price") {
      return a.price - b.price
    } 

    return a[sortBy] - b[sortBy];
  }

  const handleSearchByTerm = (value: string) => {
    return (food: any) => {
      return food.name.toLowerCase().includes(value.toLowerCase()) || !value
    }
  }

  const handleSortByPrice = (element: any) => {
    const { price } = filters;
    return element.price >= price[0] && element.price <= price[1];
  }

  const handleSelectCategory = (element: any) => {
    const { category } = filters;
    return element.category.toLowerCase() === category.toLowerCase();
  }

  const displayFood = () => {
    const { type, category } = filters;

    if (category.toLowerCase() === "all") {
      return (
        food
          .filter(handleSearchByTerm(searchTerm))
          .filter((el) => handleSortByPrice(el))
          .sort((a, b) => handleSortType(a, b))
          .map((el) => (
            <Col xs={24} md={12} lg={8} xl={6} key={el.databaseId}>
              <FoodCard {...el} />
            </Col>
          ))
          [type === "asc" ? "slice" : "reverse"]()
          .slice(0, displayAmount)
      )
    }

    return (
      food
        .filter((el) => handleSelectCategory(el))
        .filter((el) => handleSortByPrice(el))
        .sort((a, b) => handleSortType(a, b))
        .map((el) => (
          <Col xs={24} md={12} lg={8} xl={6} key={el.databaseId}>
              <FoodCard {...el} />
            </Col>
        ))
        [type === "asc" ? "slice" : "reverse"]()
        .slice(0, displayAmount)
    )
  }

  React.useEffect(() => {
    const database = firebase.firestore();
    const foodRef = database.collection("foods"); // THIS COLLECTION IS TEMPORARY AND NAME WILL CHANGE

    let fillArray: Array<any> = [];

    const unsubscribe = foodRef.onSnapshot((querySnapshot) => {
      querySnapshot.docs.forEach((food) => {
        fillArray.push({ ...food.data(), databaseId: food.id });
      });

      setFood(fillArray);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const database = firebase.firestore();
    const foodRef = database.collection("categories");

    let fillArray: Array<any> = [];

    const unsubscribe = foodRef.onSnapshot((querySnapshot) => {
      querySnapshot.docs.forEach((category) => {
        fillArray.push({ ...category.data() });
      });

      setCategories(fillArray);
    });

    return () => unsubscribe();
  }, [])

  return (
    <div className="browse">
      <header className="browse__header">
        <div className="browse__header-inner">
          <div className="browse__title">
            <h1
              className="browse__title-heading"
              onClick={() => history.push("/")}
            >
              Order something
            </h1>
            <User />
          </div>

          <div className="browse__options">
            <div className="browse__options-inner">
              <div className="browse__filter">
                <h3 className="browse__options-title">Type: </h3>
                <Select defaultValue="asc" className="browse__select" onChange={(e) => handleUpdateFilters("type", e)}>
                  <Select.Option value="asc">Ascending</Select.Option>
                  <Select.Option value="desc">Descending</Select.Option>
                </Select>
              </div>

              <div className="browse__filter">
                <h3 className="browse__options-title">Sort by: </h3>
                <Select defaultValue="price" className="browse__select" onChange={(e) => handleUpdateFilters("sortBy", e)}>
                  <Select.Option value="alphabetical">
                    Alphabetical
                  </Select.Option>
                  <Select.Option value="price">Price</Select.Option>
                  <Select.Option value="rating">Rating</Select.Option>
                </Select>
              </div>

              <div className="browse__filter">
                <h3 className="browse__options-title">Category: </h3>
                <Select defaultValue="All" className="browse__select" onChange={(e) => handleUpdateFilters("category", e)}>
                  {
                    categories.length ? (
                      categories.sort((a, b) => a.id - b.id).map((category) => (
                        <Select.Option value={category.name} key={category.id}>
                          {category.name}
                        </Select.Option>  
                      ))
                    ) : ""
                  }
                </Select>
              </div>

              <div className="browse__filter browse__price">
                <h3 className="browse__options-title">Price: </h3>
                <span className="browse__price-slider">
                  <Slider defaultValue={[0, 160]} max={160} range onChange={(e) => handleUpdateFilters("price", e)} />
                </span>
              </div>
            </div>
            <div className="browse__search">
              <input
                type="text"
                placeholder="Search"
                className="browse__input"
                onChange={(e) => handleUpdateSearchTerm(e)}
              />
              <SearchOutlined
                style={{ fontSize: "1rem", color: "rgb(247, 151, 0)" }}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="browse__board">
        <Row>
          {
            food.length ? (
              displayFood()
            ) : <Skeleton />
          }

        </Row>
      </section>

      <button className="browse__show-more" onClick={handleDisplayMore}>
        { displayFood().length >= displayAmount ? "More" : "Less" }
      </button>
    </div>
  );
};
