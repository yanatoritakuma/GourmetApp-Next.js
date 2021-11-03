/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo, FC } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { db } from "../firebas/initFirebase";
import { Post } from "../components/Post";

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
    },
  ]);

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
                <Post
                  key={post.id}
                  postId={post.id}
                  avatar={post.avatar}
                  image={post.image}
                  storeName={post.storeName}
                  storeTel={post.storeTel}
                  streetAddress={post.streetAddress}
                  note={post.note}
                  category={post.category}
                  timestamp={post.timestamp}
                  username={post.username}
                />
              ))}
            </div>
          )}
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

export default Categorypage;
