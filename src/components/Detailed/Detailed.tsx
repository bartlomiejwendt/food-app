import React from "react";
import "./detailed.scss";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, foodTypes, useTrackedState } from "../../store/store";

import firebase from "firebase/app";
import "firebase/firestore";

import { Carousel, Divider, InputNumber, Rate, Skeleton } from "antd";
import {
  ArrowLeftOutlined,
  DownOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { DetailedComment } from "./DetailedComment/DetailedComment";
import { AddComment } from "./AddComment/AddComment";

const initialProduct = {
  databaseId: "",
  category: "Category",
  description: "Lorem",
  name: "Name",
  opinions: [],
  photos: [],
  price: 0,
  restaurant: {
    id: "12345",
    name: "restaurant name"
  }
}

interface productTypes {
  databaseId: string,
  category: string,
  description: string,
  name: string,
  opinions: any[],
  photos: string[],
  price: number,
  restaurant: {
    id: string,
    name: string
  }
}

export const Detailed: React.FC = () => {
  const history: any = useHistory();
  const params: { id: string } = useParams();
  const state = useTrackedState();
  const dispatch = useDispatch();

  const [isCommentsVisible, setIsCommentsVisible] = React.useState<boolean>(true);

  const [quantity, setQuantity] = React.useState<number>(1);
  const [isInBasket, setIsInBasket] = React.useState<boolean>(false);

  const [product, setProduct] = React.useState<productTypes>(initialProduct);
  const [opinions, setOpinions] = React.useState<any[]>([]);

  const { name, photos, restaurant, description, databaseId, price } = product;

  const handleToggleIsCommentVisible = () => {
    setIsCommentsVisible((prevState: boolean): boolean => !prevState);
  };

  const handleUpdateQuantity = (e: any) => {
    setQuantity(e);
  };

  const handleCloseProfile = () => {
    if (history.location.state) {
      history.push(history.location.state.from);
    } else {
      history.push("/");
    }
  };

  const handleAddToBasket = (product: productTypes) => {
    const item: foodTypes = {
      ...product,
      quantity
    }

    dispatch({ type: "ADD_TO_BASKET", item });

    setIsInBasket(true);
  };

  const handleRemoveFromBasket = (id: string) => {
    dispatch({ type: "REMOVE_FROM_BASKET", id });

    setIsInBasket(false);
  };

  const handleCalculateAverageRate = () => {
    const productAvgRate = opinions.reduce((total, next): number => total + next.rate, 0) / opinions.length;

    return productAvgRate
  }

  React.useEffect(() => {
    const { basket } = state;

    const findItem = basket.find((el) => el.databaseId === databaseId);

    if (findItem) {
      setIsInBasket(true);
    } else {
      setIsInBasket(false);
    }

  }, [state, databaseId])

  React.useEffect(() => {
    const { id } = params;

    const database = firebase.firestore();
    const opinionsRef = database.collection("foods").doc(id).collection("opinions");

    const unsubscribe = opinionsRef.onSnapshot((querySnapshot) => {
      const opinions = querySnapshot.docs;
      
      const fillArray: any[] = [];

      opinions.forEach((opinion) => {
        fillArray.push({ ...opinion.data(), opinionId: opinion.id });
      })
      
      setOpinions(fillArray);
    })


    return () => unsubscribe();
  }, [params])

  React.useEffect(() => {
    const { id } = params;

    const database = firebase.firestore();
    const projectRef = database.collection("foods").doc(id);

    projectRef.get().then(
      (product: any) => {
        setProduct({ ...product.data(), databaseId: product.id });
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
      }
    );
  }, [params]);


  return product ? (
    <div className="detailed">
      <span className="detailed__close" onClick={() => handleCloseProfile()}>
        <ArrowLeftOutlined />
        <p className="detailed__close-text">Close this view</p>
      </span>

      <div className="detailed__photos">
        <Carousel>
            {
              photos ? (
                photos.map((photo, idx) => {
                 return (
                  <div className="detailed__photo" key={idx}>
                    <img
                      src={photo}
                      alt="food"
                      className="detailed__img"
                    />
                  </div>
                 )
                })
              ) : ("Loading...")
            }
        </Carousel>
      </div>

      <div className="detailed__info">
          <span className="detailed__restaurant">{restaurant.name}</span>
        <h1 className="detailed__name">{name}</h1>

        <div className="detailed__reviews">
          <Rate disabled value={ opinions.length ? handleCalculateAverageRate() : 0 } /> {`(${opinions.length} reviews)`}
        </div>

        <p className="detailed__description">
          {description}
        </p>

        <p className="detailed__price">
          ${(price * quantity).toFixed(2)}
        </p>

        <div className="detailed__add">
          <InputNumber
            min={1}
            max={10}
            defaultValue={quantity}
            placeholder="1"
            onChange={(e) => handleUpdateQuantity(e)}
          />
          {
            isInBasket ? (
              <button className="detailed__remove-from-cart" onClick={() => handleRemoveFromBasket(databaseId)}>Remove from card</button> 
            ) : (
              <button className="detailed__add-to-cart" onClick={() => handleAddToBasket(product)}>Add to cart</button>
            )
          }
        </div>
      </div>

      <Divider />

      <section className="detailed__comments">
        <h2
          className="detailed__comments-title"
          onClick={handleToggleIsCommentVisible}
        >
          <span>Comments</span>
          {isCommentsVisible ? (
            <DownOutlined className="detailed__comments-right" />
          ) : (
            <RightOutlined className="detailed__comments-right" />
          )}
        </h2>

        <div
          className="detailed__comments-list"
          style={isCommentsVisible ? { display: "flex" } : { display: "none" }}
        >
          <AddComment />

          {
            opinions.length ? (
              opinions.sort((a, b) => b.date - a.date).map((opinion, idx) => (
                <DetailedComment {...opinion} key={idx} />
              ))
            ) : (
              <p style={{ margin: "1rem 0" }}>There are no comments yet</p>
            )
          }
        </div>
      </section>
    </div>
  ) : (
    <Skeleton />
  );
};
