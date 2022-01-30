/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Box, Modal, Button, TextField } from "@material-ui/core";
import firebase from "firebase/app";
import { db } from "../firebas/initFirebase";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { useDeletePost } from "../hooks/useDeletePost";
import { useUpDatePost } from "../hooks/useUpDatePost";
import NoImage from "../public/image/noimage.png";
import { Avatar } from "@material-ui/core";
import Image from "next/image";
import SendIcon from "@material-ui/icons/Send";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

type Props = {
  modal: boolean;
  setModal: (value: React.SetStateAction<boolean>) => void;
  selectedState:
    | {
        id: string;
        avatar: string;
        image: string;
        storeName: string;
        storeTel: string;
        streetAddress: string;
        note: string;
        category: string;
        timestamp: null;
        username: string;
        userID: string;
      }
    | any;
};

type TypeComment = {
  avatar: string;
  text: string;
  username: string;
  userId: string;
  timestamp: any;
  rating: number | null;
};

export const ModalDishes = (props: Props) => {
  const { modal, setModal, selectedState } = props;
  const user = useSelector(selectUser);
  const [upDateContents, setUpDateContents] = useState({
    storeName: "",
    phoneNumber: "",
    streetAddress: "",
    note: "",
    category: "",
  });
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(1);
  const [comments, setComments] = useState<TypeComment[]>([
    {
      avatar: user.photoUrl,
      text: comment,
      username: user.dispalayName,
      timestamp: null,
      rating: rating,
      userId: user.uid,
    },
  ]);

  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(selectedState?.id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
            userId: doc.data().userId,
            rating: doc.data().rating,
          }))
        );
      });

    return () => {
      unSub();
    };
  }, [selectedState?.id]);

  const initContents = {
    storeName: selectedState?.storeName,
    phoneNumber: selectedState?.storeTel,
    streetAddress: selectedState?.streetAddress,
    note: selectedState?.note,
    category: selectedState?.category,
  };

  // 初期化がundefinedが入ってくるのでuseEffectで再代入
  useEffect(() => {
    setUpDateContents({
      ...upDateContents,
      storeName: selectedState?.storeName,
      phoneNumber: selectedState?.storeTel,
      streetAddress: selectedState?.streetAddress,
      note: selectedState?.note,
      category: selectedState?.category,
    });
  }, [selectedState]);

  const [change, setChange] = useState({
    storeName: false,
    phoneNumber: false,
    streetAddress: false,
    note: false,
    category: false,
  });

  const resetUpDateContents = () => {
    if (
      upDateContents.storeName === initContents.storeName &&
      upDateContents.phoneNumber === initContents.phoneNumber &&
      upDateContents.streetAddress === initContents.streetAddress &&
      upDateContents.category === initContents.category &&
      upDateContents.note === initContents.note
    ) {
      return alert("変更がありません。");
    }

    upDateBtn(selectedState?.id, upDateContents);
    setChange({
      storeName: false,
      phoneNumber: false,
      streetAddress: false,
      note: false,
      category: false,
    });
    setModal(false);
  };

  const targetImg = selectedState?.image.substring(
    84,
    selectedState?.image.indexOf("?")
  );

  const { deleteBtn } = useDeletePost();
  const { upDateBtn } = useUpDatePost();

  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").doc(selectedState?.id).collection("comments").add({
      avatar: user.photoUrl,
      text: comment,
      username: user.dispalayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user.uid,
      rating: rating,
    });
    setComment("");
  };

  const commentRef = db.collection(`posts/${selectedState?.id}/comments`);

  const deleteComment = (comment: any) => {
    const ret = window.confirm("削除しますか？");
    if (!ret) {
      return false;
    } else {
      return commentRef.doc(comment.id).delete();
    }
  };

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box css={ModalBox}>
        <h3>
          <FontAwesomeIcon
            className="closeBtn"
            icon={faTimesCircle}
            onClick={() => setModal(false)}
          />
          {selectedState?.storeName}
        </h3>
        {selectedState?.image === "" ? (
          <div className="ModalBox__noImg">
            <Image src={NoImage} alt="NoImage" />
          </div>
        ) : (
          <img src={selectedState?.image} alt="image" />
        )}

        <div className="ModalBox__in">
          <h4>店名</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.storeName ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.storeName}
            </p>
            <input
              type="text"
              value={upDateContents.storeName}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  storeName: e.target.value,
                })
              }
              style={
                change.storeName ? { display: "block" } : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, storeName: !change.storeName })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
          <h4>電話番号</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.phoneNumber ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.storeTel}
            </p>
            <input
              type="text"
              value={upDateContents.phoneNumber}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  phoneNumber: e.target.value,
                })
              }
              style={
                change.phoneNumber ? { display: "block" } : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, phoneNumber: !change.phoneNumber })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
          <h4>住所</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.streetAddress
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              {selectedState?.streetAddress}
            </p>
            <input
              type="text"
              value={upDateContents.streetAddress}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  streetAddress: e.target.value,
                })
              }
              style={
                change.streetAddress
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, streetAddress: !change.streetAddress })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
          <h4>カテゴリー</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.category ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.category}
            </p>

            <select
              value={upDateContents.category}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  category: e.target.value,
                })
              }
              style={
                change.category ? { display: "block" } : { display: "none" }
              }
            >
              <option value="all">All</option>
              <option value="meat">MeatDish</option>
              <option value="fish">FishDish</option>
              <option value="noodle">Noodles</option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="coffee">Coffee</option>
            </select>

            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, category: !change.category })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
          <h4>メモ</h4>
          <div className="ModalBox__inTextBox">
            <p style={change.note ? { display: "none" } : { display: "block" }}>
              {selectedState?.note}
            </p>
            <textarea
              value={upDateContents.note}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  note: e.target.value,
                })
              }
              style={change.note ? { display: "block" } : { display: "none" }}
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() => setChange({ ...change, note: !change.note })}
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
          <form onSubmit={newComment}>
            <div>
              <Typography component="legend">評価</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(e: any) => {
                  setRating(e.target.value);
                }}
              />
            </div>
            <div css={commentInputBox}>
              <TextField
                id="filled-multiline-static"
                label="コメント"
                multiline
                rows={0}
                variant="filled"
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
              />
              <Button disabled={!comment} type="submit">
                <SendIcon />
              </Button>
            </div>
          </form>
          <Button
            css={openCommentBtn}
            onClick={() => setOpenComment(!openComment)}
          >
            {openComment ? "コメントを非表示にする" : "コメントを表示する"}
          </Button>

          {openComment
            ? comments.map((v, i) => (
                <div css={commentBox} key={i}>
                  <Typography component="legend">コメント</Typography>
                  <Rating name="read-only" value={v.rating} readOnly />
                  <p className="commentBox__text">{v.text}</p>
                  <div className="commentBox__user">
                    <p>{v.username}</p>
                    <Avatar src={v.avatar} />
                  </div>
                  {user.uid === v?.userId ||
                  user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
                    <Button
                      className="deleteBtn"
                      onClick={() => deleteComment(v)}
                    >
                      削除
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              ))
            : ""}
        </div>
        {user.uid === selectedState?.userID ||
        user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
          <>
            <Button
              className="deleteBtn"
              onClick={() => {
                deleteBtn(selectedState?.id, targetImg), setModal(false);
              }}
            >
              削除
            </Button>
            <Button className="upDateBtn" onClick={() => resetUpDateContents()}>
              更新
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
};

const ModalBox = css`
  padding-bottom: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  outline: none;
  width: 100%;
  max-width: 1000px;
  height: auto;
  max-height: 750px;
  overflow-wrap: break-word;
  overflow: scroll;

  h3 {
    margin: 0;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    background-color: #fcc800;
    overflow-wrap: break-word;
    overflow: scroll;
    max-height: 100px;
    position: relative;

    .closeBtn {
      position: absolute;
      left: 20px;
      font-size: 28px;
      cursor: pointer;
    }
  }

  img,
  .ModalBox__noImg {
    margin: 20px auto;
    display: block;
    width: 100%;
    max-width: 500px;
  }

  .deleteBtn {
    margin: 10px auto;
    display: block;
    background-color: #ea5549;
    color: #fff;

    &:hover {
      background-color: #ea5549;
    }
  }

  .upDateBtn {
    margin: 10px auto;
    display: block;
    background-color: #2cb4ad;
    color: #fff;

    &:hover {
      background-color: #2cb4ad;
    }
  }

  .ModalBox__in {
    padding: 20px 20px 60px 20px;

    p {
      padding-bottom: 4px;
    }
  }

  .ModalBox__inTextBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p,
    input,
    textarea {
      width: 90%;
    }

    p {
      border-bottom: 1px solid #aaa;
    }

    input {
      border: 1px solid #333;
    }
  }

  @media screen and (max-width: 1024px) {
    margin: 30px 0;
    width: 90%;
    max-height: 700px;

    img,
    .ModalBox__noImg {
      width: 90%;
    }
  }
`;

const commentInputBox = css`
  display: flex;
  align-items: flex-end;

  .MuiFormControl-root {
    width: 30%;
    min-width: 200px;
  }

  button {
    background-color: #d3d0d0;
  }
`;

const commentBox = css`
  margin: 20px 0;
  padding: 6px;
  display: block;
  box-shadow: 0 0 8px #aaa;
  border-radius: 10px;

  .commentBox__text {
    max-height: 300px;
    overflow-y: scroll;
  }

  .commentBox__user {
    display: flex;
    align-items: center;

    .MuiAvatar-root {
      width: 100%;
      height: 100%;
      max-width: 30px;
    }
  }
`;

const openCommentBtn = css`
  margin: 10px 0 !important;
  background-color: #d3d0d0 !important;
`;
