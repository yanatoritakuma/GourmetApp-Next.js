/** @jsxImportSource @emotion/react */
import React, { useState, useRef, FC } from "react";
import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebas/initFirebase";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { Button } from "@material-ui/core";

export const siteTitle = "GourmetApp";

export const Layout: FC = ({ children }) => {
  const [openHam, setOpenHam] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector(selectUser);

  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="og:title" content={siteTitle} />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
      </Head>
      <header css={headerBox}>
        <div className="header__box">
          <Link href="/">
            <a>
              <Image
                src="/image/logoTop.jpg"
                height={30}
                width={30}
                alt="icon"
              />
            </a>
          </Link>
          <h2>GourmetApp</h2>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a className="header__boxLink">Home</a>
                </Link>
              </li>
              <li>
                <span className="header__boxLink">Category</span>
                <div className="header__hover">
                  <Link href="/all">
                    <a>
                      <span data-text="AllDishes">AllDishes</span>
                    </a>
                  </Link>
                  <Link href="/meat">
                    <a>
                      <span data-text="MeatDish">MeatDish</span>
                    </a>
                  </Link>
                  <Link href="/fish">
                    <a>
                      <span data-text="FishDish">FishDish</span>
                    </a>
                  </Link>
                  <Link href="/noodle">
                    <a>
                      <span data-text="Noodles">Noodles</span>
                    </a>
                  </Link>
                  <Link href="/salad">
                    <a>
                      <span data-text="Salad">Salad</span>
                    </a>
                  </Link>
                  <Link href="/dessert">
                    <a>
                      <span data-text="Dessert">Dessert</span>
                    </a>
                  </Link>
                  <Link href="/coffee">
                    <a>
                      <span data-text="Coffee">Coffee</span>
                    </a>
                  </Link>
                </div>
              </li>
              <li>
                <Link href="/MyPage">Myページ</Link>
              </li>
              <li>
                <Link href="/Hotpepper">検索</Link>
              </li>

              {user.uid === "" ? (
                <Link href="/Login">
                  <button className="header__logIn">
                    <FontAwesomeIcon
                      className="header__logInIcon"
                      icon={faSignInAlt}
                    />
                    LogIn
                  </button>
                </Link>
              ) : (
                <li onClick={() => auth.signOut()}>
                  <Link href="/Login">
                    <button className="header__logIn header__logIn--logOut">
                      <FontAwesomeIcon
                        className="header__logInIcon"
                        icon={faSignOutAlt}
                      />
                      LogOut
                    </button>
                  </Link>
                </li>
              )}

              <li className="header__boxIi">
                <a
                  className="header__boxIcon"
                  href="https://www.instagram.com/gourmet126527/"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={openHam ? "closeHum" : "header__boxSp"}
            onClick={() => setOpenHam(!openHam)}
            onBlur={() => setOpenHam(false)}
            ref={menuRef}
            tabIndex={0}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`hamMenu ${openHam ? "shown" : ""}`}>
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/all">
              <a>AllDishes</a>
            </Link>
            <Link href="/meat">
              <a>MeatDish</a>
            </Link>
            <Link href="/fish">
              <a>FishDish</a>
            </Link>
            <Link href="/noodle">
              <a>Noodles</a>
            </Link>
            <Link href="/salad">
              <a>Salad</a>
            </Link>
            <Link href="/dessert">
              <a>Dessert</a>
            </Link>
            <Link href="/coffee">
              <a>Coffee</a>
            </Link>
            <Link href="/MyPage">Myページ</Link>

            <Link href="/Hotpepper">検索</Link>

            {user.uid === "" ? (
              <Link href="/Login">
                <button className="header__logIn">
                  <FontAwesomeIcon
                    className="header__logInIcon"
                    icon={faSignInAlt}
                  />
                  LogIn
                </button>
              </Link>
            ) : (
              <Link href="/Login">
                <button
                  onClick={() => auth.signOut()}
                  className="header__logIn header__logIn--logOut"
                >
                  <FontAwesomeIcon
                    className="header__logInIcon"
                    icon={faSignOutAlt}
                  />
                  LogOut
                </button>
              </Link>
            )}

            <a
              className="header__boxIcon"
              href="https://www.instagram.com/gourmet126527/"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

const headerBox = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;

  .header__box {
    padding: 8px 0;
    position: fixed;
    z-index: 999;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    background-color: #fff;

    img {
      min-width: 60px;
      border-radius: 50%;
    }

    nav {
      width: 100%;
    }
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      width: 80%;
      position: relative;
    }

    li {
      margin: 0 20px;
      cursor: pointer;
      position: relative;

      &:hover {
        .header__hover {
          opacity: 1;
          visibility: visible;
          transition: 0.3s;
          top: 24px;
          width: 150px;
        }
      }
    }

    .header__boxLink {
      font-size: 14px;
      font-weight: bold;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0) 50%,
        #ffa500 50%
      );
      background-position: 0 0;
      background-size: 200% auto;
      transition: 0.3s;
      &:hover {
        background-position: -100% 0;
        color: #fff;
      }
    }

    .header__hover {
      padding: 20px 40px;
      position: absolute;
      top: 0px;
      left: -62%;
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
      background-color: #fff;
      box-shadow: 2px 2px 4px #faebd7;
      border-radius: 10px;
      width: 100%;

      a {
        margin: 10px auto;
        display: inline-block;
        perspective: 1000px;
        perspective-origin: 50% 50%;
        vertical-align: bottom;
        overflow: hidden;
        font-size: 14px;
        &:hover {
          span {
            background-color: #ffa500;
            transform: translate3d(0, 0, -30px) rotateX(90deg);
          }
        }

        span {
          display: inline-block;
          position: relative;
          padding: 0 0.3em;
          transition: 0.4s;
          transform-origin: 50% 0%;
          transform-style: preserve-3d;
          &::after {
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            content: attr(data-text);
            padding: 0 4px;
            color: #fff;
            background-color: #ffa500;
            transform-origin: 50% 0%;
            transform: translate3d(0, 105%, 0) rotateX(-90deg);
          }
        }
      }
    }

    a {
      text-decoration: none;
      color: #000000;
      font-weight: bold;
      font-size: 12px;
    }

    .header__boxIi {
      position: absolute;
      right: 0;
    }

    .header__boxIcon {
      margin: 20px auto;
      display: block;
      width: 30px;
      font-size: 30px;
      color: #c13584;
    }
  }

  .header__logIn {
    padding: 8px;
    background-color: #17c517;
    box-shadow: 0px 2px 0px #075707;
    border-radius: 4px;
    border: none;
    color: #fff;
    cursor: pointer;
    transition: 0.1s;
    display: flex;
    align-items: center;
    &:hover {
      box-shadow: 0px 0px 0px #075707;
      transform: translateY(3px);
      transition: 0.1s;
    }

    .header__logInIcon {
      margin-right: 6px;
      width: 20px;
    }
    @media screen and (max-width: 768px) {
      margin: 0 auto;
      display: block;
      width: 50%;
    }
  }

  .header__logIn--logOut {
    background-color: #ff6347;
    box-shadow: 0px 2px 0px #8f1b07;
  }

  .header__boxSp {
    display: none;
  }

  .hamMenu {
    display: none;
    width: 80%;
    height: 100%;
    background-color: #fff;
    box-shadow: 4px 4px 4px #000000;
    position: fixed;
    top: 78px;
    left: -1000px;
    z-index: 9999;
    opacity: 1;
    transition: 0.3s;
    transition: 0.5s;
    &.shown {
      left: 0px;
      transition: 0.5s;
    }

    a {
      margin: 40px 0;
      display: block;
      text-align: center;
      font-size: 24px;
    }

    @media screen and (max-width: 425px) {
      a {
        margin: 28px 0;
      }
    }
  }

  .closeHum {
    display: block;
    position: absolute;
    top: 30px;
    right: 30px;
    display: block;
    width: 30px;
    height: 60px;
    &:focus {
      outline: none;
    }

    span {
      margin: 10px 0;
      display: block;
      width: 100%;
      height: 2px;
      background-color: #000000;
      transition: 0.3s;

      &:first-of-type {
        transform: translateY(6px) rotate(150deg);
      }
      &:nth-of-type(2) {
        transform: translateY(-6px) rotate(-150deg);
        margin-bottom: 0;
      }
      &:nth-of-type(3) {
        display: none;
        transition: 0.3s;
      }

      &:focus {
        outline: none;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .header__box {
      nav {
        display: none;
      }
    }

    .hamMenu {
      display: block;
    }

    .header__boxSp {
      display: block;
      position: absolute;
      top: 20px;
      right: 30px;
      display: block;
      width: 30px;
      height: 60px;
      &:focus {
        outline: none;
      }

      span {
        margin: 10px 0;
        display: block;
        width: 100%;
        height: 2px;
        background-color: #000000;
        transition: 0.3s;
      }
    }
  }

  @media screen and (max-width: 425px) {
    .header__box {
      h2 {
        font-size: 20px;
      }
    }

    .hamMenu {
      a {
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 320px) {
    .hamMenu {
      width: 80%;
    }
  }
`;
