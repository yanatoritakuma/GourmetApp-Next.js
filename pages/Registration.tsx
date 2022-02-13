/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { storage, db } from "../firebas/initFirebase";
import { Button, IconButton, TextField, Box } from "@material-ui/core";
import firebase from "firebase/app";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const Registration = () => {
  const [storeName, setStoreName] = useState("");
  const [storeTel, setStoreTel] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [photoUrl, setPhotoUrl] = useState<File | null>(null);
  const user = useSelector(selectUser);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPhotoUrl(e.target.files![0]);
      e.target.value = "";
    }
  };

  const onClickRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    const ret = window.confirm("この内容で登録しますか？");
    if (ret) {
      e.preventDefault();
      if (photoUrl) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        )
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + photoUrl.name;
        const uploadImg = storage.ref(`images/${fileName}`).put(photoUrl);
        uploadImg.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (err) => {
            alert(err.message);
          },
          async () => {
            await storage
              .ref("images")
              .child(fileName)
              .getDownloadURL()
              .then(async (url) => {
                await db.collection("posts").add({
                  avatar: user.photoUrl,
                  image: url,
                  storeName: storeName,
                  storeTel: storeTel,
                  streetAddress: streetAddress,
                  note: note,
                  category: category,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  username: user.dispalayName,
                  userID: user.uid,
                });
              });
          }
        );
      } else {
        db.collection("posts").add({
          avatar: user.photoUrl,
          image: "",
          storeName: storeName,
          storeTel: storeTel,
          streetAddress: streetAddress,
          note: note,
          category: category,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user.dispalayName,
          userID: user.uid,
        });
      }
      setStoreName("");
      setPhotoUrl(null);
      setStoreTel("");
      setStreetAddress("");
      setCategory("");
      setNote("");
      alert("登録完了しました。");
    }
  };

  return (
    <Layout>
      {user.uid === "YF2wQAnshNTklD0P0rUgGlo2P2v2" || user.uid === "" ? (
        <section css={registration}>
          <h2 className="guestLogin">
            ログインしていない方、Guestでログインしている方は登録はできません。
          </h2>
        </section>
      ) : (
        <section css={registration}>
          <h2>Registration</h2>
          <form onSubmit={onClickRegistration}>
            <div css={registration__box}>
              <Box>
                <TextField
                  fullWidth
                  label="店名"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="電話番号"
                  value={storeTel}
                  onChange={(e) => setStoreTel(e.target.value)}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="住所"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
              </Box>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">カテゴリー</option>
                <option value="meat">肉</option>
                <option value="fish">魚</option>
                <option value="noodle">麺</option>
                <option value="salad">サラダ</option>
                <option value="dessert">デザート</option>
                <option value="coffee">飲み物</option>
              </select>

              <textarea
                placeholder="メモ"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>

              {photoUrl?.name === undefined ? (
                <IconButton className="registration__boxImgBtn">
                  <label>
                    <AddAPhotoIcon className="registration__boxImgBtnIcon" />
                    <input type="file" onChange={onChangeImageHandler} />
                  </label>
                </IconButton>
              ) : (
                <div className="faCheckSquare__imgBox">
                  <label>
                    <p>画像が設定されています</p>
                    <input type="file" onChange={onChangeImageHandler} />
                    <FontAwesomeIcon
                      className="faCheckSquare__imgIcon"
                      icon={faCheckSquare}
                    />
                  </label>
                </div>
              )}

              <Button type="submit" disabled={!storeName}>
                登録
              </Button>
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

const registration = css`
  margin: auto;
  margin-top: 84px;
  padding: 20px 12px;
  background-color: #e2dedb;
  border-radius: 20px;
  width: 100%;
  height: auto;
  max-width: 1200px;

  h2 {
    font-size: 26px;
    text-align: center;
    color: #b3aca7;
  }

  img {
    width: 50%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
  }

  .guestLogin {
    text-align: center;
  }

  @media screen and (max-width: 425px) {
    h2 {
      font-size: 20px;
    }
  }
`;

const registration__box = css`
  margin: 20px auto;
  width: 56%;
  min-width: 300px;
  color: #726659;

  input {
    padding: 10px 0;
    display: block;
    width: 100%;
    border: 1px solid #b3aca7;
    font-size: 12px;
  }

  select {
    margin: 10px 0;
    padding: 10px 0;
    display: block;
    background-color: #e2dedb;
    width: 30%;
    border: 1px solid #b3aca7;
    color: #726659;
    font-size: 12px;
  }

  textarea {
    padding: 10px 0;
    display: block;
    background-color: #e2dedb;
    width: 100%;
    height: 200px;
    border: 1px solid #b3aca7;
    font-size: 12px;
  }

  button {
    margin: auto;
    margin-top: 20px;
    padding: 10px 0;
    display: block;
    background-color: #e2dedb;
    width: 30%;
    border: 1px solid #b3aca7;
    color: #726659;
    box-shadow: 0 3px 0px 0 #726659;
    cursor: pointer;
    &:hover {
      box-shadow: none;
      transform: translateY(3px);
    }
  }

  .registration__boxImgBtn {
    width: 30%;
    min-width: 120px;

    label {
      padding: 20px 0;
      width: 100%;
      /* background-color: skyblue; */
      cursor: pointer;
    }

    input {
      display: none;
    }

    .registration__boxImgBtnIcon {
      display: block;
      width: 100%;
    }
  }

  .faCheckSquare__imgBox {
    margin: 20px auto;
    padding: 10px;
    width: fit-content;
    background-color: #e2dedb;
    border-radius: 4px;
    border: 1px solid #b3aca7;
    color: #726659;

    input {
      display: none;
    }

    p {
      text-align: center;
    }

    .faCheckSquare__imgIcon {
      margin: 0 auto;
      display: block;
      font-size: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    button {
      width: 80%;
    }
  }
`;

export default Registration;
