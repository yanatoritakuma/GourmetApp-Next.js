/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo, FC } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { ModalStaet } from "../components/ModalStaet";
import { useAppSelector } from "../app/hooks";
import { useSelect } from "../hooks/useSelectState";
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

type CategoryValueType = {
  category: string;
  id: string;
  name: string;
  note: string;
  photoUrl: string;
  streetAddress: string;
};

const Categorypage: FC<Props> = ({ category }) => {
  const { categories } = useAppSelector((state) => state.dishes);
  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelect();

  const [posts, setPosts] = useState([
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
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
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);

  const onClickModal = () => {
    setModal(!modal);
  };

  const onClickOpen = (categoryValue: CategoryValueType) => {
    onSelectState({ categories, categoryValue });
    onClickModal();
  };

  const categoryArray =
    category === "all"
      ? categories
      : categories.filter((v) => v.category === category);

  // const activeTitle = () => {
  //   if (category === "meat") {
  //     return meat;
  //   } else if (category === "fish") {
  //     return fish;
  //   } else if (category === "noodle") {
  //     return noodle;
  //   } else if (category === "salad") {
  //     return salad;
  //   } else if (category === "dessert") {
  //     return dessert;
  //   } else if (category === "coffee") {
  //     return coffee;
  //   }
  // };

  // return useMemo(
  //   () => (
  //     <Layout>
  //       <section className={utilStyles.categoryPage}>
  //         <h2 className={activeTitle()}>{category}Page</h2>
  //         <ul>
  //           {categoryArray.map((categoryValue) => {
  //             if (categoryValue.name === "") {
  //               return [];
  //             } else {
  //               return (
  //                 <li
  //                   key={categoryValue.id}
  //                   onClick={() => onClickOpen(categoryValue)}
  //                 >
  //                   <div className={utilStyles.categoryPage__img}>
  //                     <img src={categoryValue.photoUrl} alt="" />
  //                   </div>
  //                   <h3>{categoryValue.name}</h3>
  //                 </li>
  //               );
  //             }
  //           })}
  //         </ul>
  //       </section>
  //       <ModalStaet
  //         selectedState={selectedState}
  //         modal={modal}
  //         setModal={setModal}
  //       />
  //     </Layout>
  //   ),
  //   [onClickOpen]
  // );

  return (
    <Layout>
      <section css={categoryPage}>
        <h2>{category}Page</h2>
        {posts[0]?.id && (
          <div className="categoryPage__box">
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatar={post.avatar}
                image={post.image}
                text={post.text}
                timestamp={post.timestamp}
                username={post.username}
              />
            ))}
          </div>
        )}
      </section>
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

  .meat {
    color: #e2041b;
  }

  .fish {
    color: #00afcc;
  }

  .noodle {
    color: #fcc800;
  }

  .salad {
    color: #00947a;
  }

  .dessert {
    color: #eb6ea0;
  }

  .coffee {
    color: #96514d;
  }

  ul {
    margin: auto;
    padding: unset;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 90%;
  }

  li {
    margin: 14px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 90%;
    height: 160px;
    border: 1px solid #000000;
    box-shadow: 2px 4px 3px #000000;
    transition: 0.3s;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    &:hover {
      opacity: 0.7;
      transform: translateY(-3px);
      transition: 0.3s;
    }
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
