/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { Layout } from "../components/Layout";
import { Avatar } from "@material-ui/core";
import { db } from "../firebas/initFirebase";
import Image from "next/image";
import NoImage from "../public/image/noimage.png";
import { ModalDishes } from "../components/ModalDishes";
import { useSelectPost } from "../hooks/useSelectPost";
import { Post } from "../types/post";

const Login = () => {
  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      storeName: "",
      storeTel: "",
      streetAddress: "",
      note: "",
      category: "",
      timestamp: null,
      username: "",
      userID: "",
    },
  ]);

  const [tab, setTab] = useState(true);
  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelectPost();

  const onClickOpen = (post: Post) => {
    onSelectState({ post, posts });
    setModal(!modal);
  };

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            storeName: doc.data().storeName,
            storeTel: doc.data().storeTel,
            streetAddress: doc.data().streetAddress,
            note: doc.data().note,
            category: doc.data().category,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
            userID: doc.data().userID,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  const postUserId = posts.filter((v) => v.userID === user.uid);
  console.log(postUserId.length);

  return (
    <Layout>
      {user.uid === "" || user.uid === "YF2wQAnshNTklD0P0rUgGlo2P2v2" ? (
        <section css={myPage}>
          <h2>Guest、ログインしていない方はMyページを利用できません。</h2>
        </section>
      ) : (
        <section css={myPage}>
          <h2>Myページ</h2>
          <p className="userName">{user.dispalayName}</p>
          <Avatar className="userIcon" src={user.photoUrl} />
          <div css={postListName}>
            <h3 onClick={() => setTab(true)}>投稿一覧</h3>
            <h3 onClick={() => setTab(false)}>お気に入り</h3>
          </div>
          {tab ? <p>投稿数{postUserId.length}件</p> : <p>お気に入り数</p>}
          <section css={postListMain}>
            {tab
              ? postUserId.length === 0
                ? "まだ投稿がありません"
                : postUserId.map((v) => (
                    <div
                      css={postList}
                      key={v.id}
                      onClick={() => onClickOpen(v)}
                    >
                      <p>{v.storeName}</p>
                      {v.image !== "" ? (
                        <img src={v.image} alt="image" />
                      ) : (
                        <Image src={NoImage} alt="NoImage" />
                      )}
                    </div>
                  ))
              : postUserId.length === 0
              ? "まだお気に入りがありません"
              : postUserId.map((v) => (
                  <div css={postList}>
                    <p>{v.username}</p>
                    <p>仮のお気に入り</p>
                  </div>
                ))}
            <ModalDishes
              selectedState={selectedState}
              modal={modal}
              setModal={setModal}
            />
          </section>
        </section>
      )}
    </Layout>
  );
};

const myPage = css`
  margin: auto;
  padding: 20px 12px;
  margin-top: 84px;
  padding-bottom: 40px;
  background-color: #e2dedb;
  border-radius: 20px;
  width: 90%;
  height: auto;
  max-width: 1200px;

  h2 {
    text-align: center;
  }

  .userName {
    text-align: center;
    font-size: 18px;
  }

  .userIcon {
    margin: 0 auto;
    width: 120px;
    height: 120px;
  }
`;

const postListMain = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const postListName = css`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  width: 38%;
  min-width: 260px;
  border: 1px solid #aaa;
  border-radius: 10px;

  @media screen and (max-width: 425px) {
    h3 {
      font-size: 16px;
    }
  }

  h3 {
    margin: 0;
    padding: 12px;
    width: 50%;
    text-align: center;
    color: #fff;

    &:hover {
      cursor: pointer;
    }

    &:nth-of-type(1) {
      border-radius: 10px 0 0 10px;
      background-color: #ffa500;
    }

    &:nth-of-type(2) {
      border-radius: 0 10px 10px 0;
      background-color: #e73562;
    }
  }
`;

const postList = css`
  padding: 10px 0;
  cursor: pointer;

  @media screen and (max-width: 765px) {
    margin: 20px 0;
  }

  &:nth-of-type(even) {
    background-color: #aaa;
  }

  &:nth-of-type(odd) {
    background-color: #f3f1f1;
  }

  p {
    text-align: center;
  }

  img {
    margin-top: auto;
    display: block;
    width: 100%;
  }
`;
export default Login;
