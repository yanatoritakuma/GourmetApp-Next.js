/** @jsxImportSource @emotion/react */
import Head from "next/head";
import Link from "next/link";
import { Layout, siteTitle } from "../components/Layout";
import { Button } from "@material-ui/core";
import { auth } from "../firebas/initFirebase";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";

export default function Home() {
  const user = useSelector(selectUser);
  const signInGuest = async () => {
    await auth.signInWithEmailAndPassword("guest@gmail.com", "guest1996");
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section css={main} className="index">
        <div className="index__imgBox">
          <h1 className="index__logo" />
          {user.uid ? (
            <Link href="/Registration">
              <a className="index__link">登録へ</a>
            </Link>
          ) : (
            <Link href="/Login">
              <a className="index__link">ログイン</a>
            </Link>
          )}

          {user.uid ? (
            ""
          ) : (
            <Link href="/Login">
              <Button
                className="signInGuestBtn"
                onClick={async () => {
                  try {
                    await signInGuest();
                  } catch (err: any) {
                    alert(err.message);
                  }
                }}
              >
                Guestでログイン
              </Button>
            </Link>
          )}

          <span className="index__img index__img--1"></span>
          <span className="index__img index__img--2"></span>
          <span className="index__img index__img--3"></span>
          <span className="index__img index__img--4"></span>
          <span className="index__img index__img--5"></span>
          <span className="index__img index__img--6"></span>
        </div>
      </section>
    </Layout>
  );
}

const main = css`
  .signInGuestBtn {
    padding: 12px 0;
    position: absolute;
    z-index: 99;
    top: 67%;
    left: 39%;
    width: 20%;
    background-color: #ffa500 !important;
    box-shadow: 0 5px 0 #aa6a03;
    border-radius: 8px;
    display: block;

    span {
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
    }
  }

  @media screen and (max-width: 1024px) {
    .signInGuestBtn {
      span {
        font-size: 20px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .signInGuestBtn {
      span {
        font-size: 14px;
      }
    }
  }

  @media screen and (max-width: 425px) {
    .signInGuestBtn {
      top: 66%;
      left: 29%;
      width: 42%;
    }
  }

  @media screen and (max-width: 320px) {
    .signInGuestBtn {
      top: 56%;
    }
  }
`;
