/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, FC } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { db } from "../firebas/initFirebase";
import Image from "next/image";
import NoImage from "../public/image/noimage.png";
import { Avatar } from "@material-ui/core";
import { ModalDishes } from "../components/ModalDishes";
import { useSelectPost } from "../hooks/useSelectPost";
import { Post } from "../types/post";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "all" } },
      { params: { category: "meat" } },
      { params: { category: "fish" } },
      { params: { category: "noodle" } },
      { params: { category: "salad" } },
      { params: { category: "dessert" } },
      { params: { category: "coffee" } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async (context: {
  params: { category: string };
}) => {
  const { category } = context.params;
  return {
    props: { category },
  };
};

type Props = {
  category: string;
};

const Categorypage: FC<Props> = ({ category }) => {
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

  const categoryArray =
    category === "all" ? posts : posts.filter((v) => v.category === category);

  const activeTitle = () => {
    if (category === "meat") {
      return { color: "#e2041b" };
    } else if (category === "fish") {
      return { color: "#00afcc" };
    } else if (category === "noodle") {
      return { color: "#fcc800" };
    } else if (category === "salad") {
      return { color: "#00947a" };
    } else if (category === "dessert") {
      return { color: "#eb6ea0" };
    } else if (category === "coffee") {
      return { color: "#96514d" };
    }
  };

  return (
    <Layout>
      {posts[0]?.id === "" ? (
        <section css={categoryPage}>
          <h2>Please Login</h2>
        </section>
      ) : (
        <section css={categoryPage}>
          <h2 style={activeTitle()}>{category}Page</h2>
          {posts[0]?.id && (
            <div className="categoryPage__box">
              {categoryArray.map((post) => (
                <div css={postBox} onClick={() => onClickOpen(post)}>
                  <div css={post__contents}>
                    <h3>{post.storeName}</h3>
                  </div>
                  {post.image === "" ? (
                    <Image src={NoImage} alt="NoImage" />
                  ) : (
                    post.image && (
                      <div css={post__img}>
                        <img src={post.image} alt="img" />
                      </div>
                    )
                  )}
                  <div css={post__contributor}>
                    <h3>
                      <Avatar src={post.avatar} />
                      {post.username}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ModalDishes
            selectedState={selectedState}
            modal={modal}
            setModal={setModal}
          />
        </section>
      )}
    </Layout>
  );
};

const categoryPage = css`
  margin: auto;
  margin-top: 84px;
  padding-bottom: 40px;
  background-color: #e2dedb;
  border-radius: 20px;
  width: 90%;
  height: auto;
  max-width: 1200px;

  h2 {
    padding-top: 40px;
    font-size: 32px;
    text-align: center;
    color: #f7a62e;
  }

  .categoryPage__box {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    .categoryPage__box {
      display: block;
    }
  }
`;

const postBox = css`
  margin: 20px auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 4px 3px #000;
  width: 95%;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`;

const post__contributor = css`
  margin: 10px 0;
  display: flex;
  align-items: center;

  h3 {
    margin: 0 20px;
    display: flex;
    align-items: center;
  }
`;

const post__img = css`
  display: block;
  img {
    margin: 0 auto;
    display: block;
    width: 100%;
    max-height: 380px;
    object-fit: cover;
  }
`;

const post__contents = css`
  h3 {
    margin: 10px auto;
    text-align: center;
    font-size: 26px;
    width: 100%;
    max-width: 320px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 320px;
  }
`;

export default Categorypage;
