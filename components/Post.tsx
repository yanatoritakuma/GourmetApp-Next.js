/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, FC } from "react";
import { css } from "@emotion/react";
import styles from "./Post.module.css";
import { db } from "../firebas/initFirebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message";
import SendIcon from "@material-ui/icons/Send";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  text: string;
  timestamp: any;
  username: string;
}

export const Post: FC<PROPS> = (props) => {
  return (
    <section css={post}>
      <div css={post__contents}>
        <h3>{props.text}</h3>
      </div>
      {props.image && (
        <div css={post__img}>
          <img src={props.image} alt="img" />
        </div>
      )}
      <div css={post__contributor}>
        <Avatar src={props.avatar} />
        <h3>@{props.username}</h3>
        <span>{new Date(props.timestamp?.toDate()).toLocaleString()}</span>
      </div>
    </section>
  );
};

const post = css`
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
`;

const post__img = css`
  img {
    margin: 0 auto;
    display: block;
    width: 100%;
  }
`;

const post__contents = css`
  h3 {
    margin: 10px 0;
    text-align: center;
    font-size: 26px;
    width: 100%;
  }
`;
