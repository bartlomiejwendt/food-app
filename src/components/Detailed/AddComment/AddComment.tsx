import React from "react";
import "./addcomment.scss";
import { useParams } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

import { message, Rate } from "antd";

interface inputValuesTypes {
  rate: number,
  comment: string,
}

interface Props {}

export const AddComment: React.FC<Props> = () => {
  const params: { id: string } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("authUser")!);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [inputValues, setInputValues] = React.useState<inputValuesTypes>({
    rate: 0,
    comment: ""
  })

  const handleUpdateInputValues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;

    setInputValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  } 

  const handleResetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id } = params;
    const { fullName, uid, avatar } = currentUser;
    const { rate, comment } = inputValues;

    const database = firebase.firestore();
    const foodRef = database.collection("foods").doc(id).collection("opinions");

    if (comment.length >= 4 && rate !== 0) {
      foodRef.add({
        author: fullName,
        authorUid: uid,
        authorAvatar: avatar,
        date: new Date(),
        rate,
        comment,
        likes: []
      }) 

      setInputValues({
        rate: 0,
        comment: ""
      })

      handleResetForm();

      message.success("Your comment was add!");
    } else {
      message.error("Your comment must have at least 4 letters and rate");
    }
  }

  return (
    <form className="addcomment"
      ref={formRef}
      onSubmit={(e) => handleAddComment(e)}
    >
      <Rate 
        defaultValue={inputValues.rate} 
        onChange={(value) => setInputValues((prevState) => ({...prevState, rate: value }))}
      />
      <textarea
        className="addcomment__textarea"
        placeholder="Leave your opinions for other people!"
        name="comment"
        onChange={(e) => handleUpdateInputValues(e)}
      />
      <button className="addcomment__button">Send</button>
    </form>
  );
};
