import React from "react";
import "./detailedcomment.scss";
import { useParams } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

import moment from "moment";

import { Rate } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface Props {
  author: string,
  authorAvatar: string | null,
  authorUid: string,
  comment: string,
  rate: number,
  opinionId: string,
  likes: string[],
  date: {
    seconds: number,
    nanoseconds: number
  }
}

export const DetailedComment: React.FC<Props> = (props) => {
  const params: { id: string } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("authUser")!);
  const [didUserLike, setDidUserLike] = React.useState<boolean>(false);

  const { author, comment, rate, date, likes, opinionId } = props;

  const handleLikeComment = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();

    const { id } = params;
    const { uid } = currentUser;

    const database = firebase.firestore();
    const commentRef = database.collection("foods").doc(id).collection("opinions").doc(opinionId);

    commentRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(uid)
    })
  }

  const handleDislikeComment = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();

    const { id } = params;
    const { uid } = currentUser;

    const database = firebase.firestore();
    const commentRef = database.collection("foods").doc(id).collection("opinions").doc(opinionId);

    const likesCopy = likes;
    const removeLikeFromLikes = likesCopy.filter((el) => el !== uid);

    commentRef.update({
      likes: removeLikeFromLikes
    });
  }

  React.useEffect(() => {
    const { uid } = currentUser;

    const findUser = likes.find((el) => el === uid);

    if (findUser) {
      setDidUserLike(true);
    } else {
      setDidUserLike(false);
    }
  }, [likes, currentUser])

  return (
    <div className="detailedcomment">
      <div className="detailedcomment__photo">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/web-apps-3ff3d.appspot.com/o/users%2FJMbnCIEmhyQdKu4uVvvLfJ6CGPu2%2Fprofile%2F322868_1100-1100x628.jpg?alt=media&token=0ef7efac-3fc1-49ce-9d68-ceee8e816de2"
          alt="avatar"
          className="detailedcomment__img"
        />
      </div>

      <div className="detailedcomment__user">
        <div className="detailedcomment__info">
          <span className="detailedcomment__author">{author}</span>
          <span className="detailedcomment__date">{moment.unix(date.seconds).fromNow()}</span>
        </div>

        <div className="detailedcomment__content">
          {comment}
        </div>

        <span className="detailedcomment__rate">
          <Rate disabled defaultValue={rate} />

          <span className="detailedcomment__likes">
            <span className="detailedcomment__likes-count">{likes.length}</span> 
            {
              didUserLike ? (
                <HeartFilled className="detailedcomment__heart" onClick={(e) => handleDislikeComment(e)} />
              ) : (
                <HeartOutlined className="detailedcomment__heart" onClick={(e) => handleLikeComment(e)} />
              )
            }
          </span>
        </span>
      </div>
    </div>
  );
};
