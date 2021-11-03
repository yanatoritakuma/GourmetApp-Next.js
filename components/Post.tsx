/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, FC } from "react";
import { css } from "@emotion/react";
import { Avatar } from "@material-ui/core";
import { ModalDishes } from "./ModalDishes";

interface PROPS {
  postId: string;
  avatar: string;
  image: string;
  storeName: string;
  storeTel: string;
  streetAddress: string;
  note: string;
  category: string;
  timestamp: any;
  username: string;
}

export const Post: FC<PROPS> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <section onClick={() => setOpen(!open)} css={post}>
      <div css={post__contents}>
        <h3>{props.storeName}</h3>
        <p>{props.storeTel}</p>
        <p>{props.streetAddress}</p>
        <p>{props.note}</p>
        <p>{props.category}</p>
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
      <ModalDishes
        setOpen={setOpen}
        open={open}
        storeName={props.storeName}
        storeTel={props.storeTel}
        streetAddress={props.streetAddress}
        note={props.note}
        category={props.category}
        image={props.image}
      />
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
