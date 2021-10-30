import React, { useState, useEffect, useMemo, FC } from "react";
import utilStyles from "../styles/categorypage.module.css";
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

  const activeTitle = () => {
    if (category === "meat") {
      return utilStyles.meat;
    } else if (category === "fish") {
      return utilStyles.fish;
    } else if (category === "noodle") {
      return utilStyles.noodle;
    } else if (category === "salad") {
      return utilStyles.salad;
    } else if (category === "dessert") {
      return utilStyles.dessert;
    } else if (category === "coffee") {
      return utilStyles.coffee;
    }
  };

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
      <section className={utilStyles.categoryPage}>
        <h2 className={activeTitle()}>{category}Page</h2>
        {posts[0]?.id && (
          <section className={utilStyles.categoryPage}>
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
          </section>
        )}
      </section>
    </Layout>
  );
};
export default Categorypage;
