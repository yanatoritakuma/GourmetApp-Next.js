import React, { useState, useEffect, FC } from "react";
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
    <div>
      <Avatar src={props.avatar} />
      <div>
        <div>
          <h3>
            <span>@{props.username}</span>
            <span>{new Date(props.timestamp?.toDate()).toLocaleString()}</span>
          </h3>
        </div>
        <div>
          <p>{props.text}</p>
        </div>
        {props.image && (
          <div>
            <img src={props.image} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
};
