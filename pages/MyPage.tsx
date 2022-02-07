/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { Layout } from "../components/Layout";
import { Avatar } from "@material-ui/core";

const Login = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      {user.uid === "" || "YF2wQAnshNTklD0P0rUgGlo2P2v2" ? (
        <section css={myPage}>
          {user.uid === "YF2wQAnshNTklD0P0rUgGlo2P2v2" ? (
            <h2>GuestはMyページを利用できません。</h2>
          ) : (
            <h2>ログインしていません。</h2>
          )}
        </section>
      ) : (
        <section css={myPage}>
          <h2>Myページ</h2>
          <p className="userName">{user.dispalayName}</p>
          <Avatar className="userIcon" src={user.photoUrl} />
        </section>
      )}
    </Layout>
  );
};

const myPage = css`
  margin: auto;
  padding: 20px 0;
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
export default Login;
