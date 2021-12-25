/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, ChangeEvent } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { storage, db, auth } from "../firebas/initFirebase";
import { Avatar, Button, IconButton } from "@material-ui/core";
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
    e.preventDefault();
    if (photoUrl) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
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
  };

  return (
    <Layout>
      <section css={registration}>
        <h2>Registration</h2>
        <form onSubmit={onClickRegistration}>
          <div css={registration__box}>
            <input
              placeholder="StoreName"
              type="text"
              autoFocus
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
            <input
              placeholder="PhoneNumber"
              value={storeTel}
              onChange={(e) => setStoreTel(e.target.value)}
            />
            <input
              placeholder="StreetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Category</option>
              <option value="meat">MeatDish</option>
              <option value="fish">FishDish</option>
              <option value="noodle">Noodles</option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="coffee">Coffee</option>
            </select>
            <textarea
              placeholder="Note"
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
              Register
            </Button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

const registration = css`
  margin: auto;
  margin-top: 84px;
  padding-bottom: 20px;
  background-color: #e2dedb;
  border-radius: 20px;
  width: 100%;
  height: auto;
  max-width: 1200px;

  h2 {
    padding-top: 40px;
    font-size: 32px;
    text-align: center;
    color: #b3aca7;
  }

  img {
    width: 50%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
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
    background-color: #e2dedb;
    width: 100%;
    border: 1px solid #b3aca7;
    font-size: 12px;
  }

  select {
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
