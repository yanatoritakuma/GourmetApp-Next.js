/** @jsxImportSource @emotion/react */
import React, { useState, FC } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { useDispatch } from "react-redux";
import { updeteUserProfile } from "../provider/userSlice";
import { auth, storage } from "../firebas/initFirebase";
import { IconButton, Modal, TextField, Box, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const dispatch = useDispatch();

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, passWord);
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, passWord);
    let url = "";
    if (avatarImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + avatarImage.name;

      await storage.ref(`avatars/${fileName}`).put(avatarImage);
      url = await storage.ref("avatars").child(fileName).getDownloadURL();
    }
    await authUser.user?.updateProfile({
      displayName: userName,
      photoURL: url,
    });
    dispatch(
      updeteUserProfile({
        displayName: userName,
        photoUrl: url,
      })
    );
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  return (
    <Layout>
      <section css={authBox}>
        <h2>Welcome</h2>
        <h3>{isLogin ? "Login" : "Register"}</h3>
        <div className="authBox__box">
          {!isLogin && (
            <>
              <Box css={inputBox}>
                <TextField
                  id="userName"
                  label="userName"
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserName(e.target.value);
                  }}
                />
              </Box>

              {avatarImage?.name === undefined ? (
                <IconButton className="authBox__boxIcon">
                  <label>
                    <AccountCircleIcon fontSize="large" />
                    <input type="file" onChange={onChangeImageHandler} />
                  </label>
                </IconButton>
              ) : (
                <IconButton className="auth__boxIconSelected">
                  <label>
                    <p>画像が設定されています</p>
                    <input type="file" onChange={onChangeImageHandler} />
                    <FontAwesomeIcon icon={faCheckSquare} />
                  </label>
                </IconButton>
              )}
              {console.log(avatarImage)}
            </>
          )}
          <Box css={inputBox}>
            <TextField
              id="outlined-basic"
              label="EmailAddress"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
          </Box>
          <Box css={inputBox}>
            <TextField
              id="outlined-basic"
              label="PassWord"
              type="password"
              value={passWord}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassWord(e.target.value);
              }}
            />
          </Box>
          <Button
            disabled={
              isLogin
                ? !email || passWord.length < 6
                : !userName || !email || passWord.length < 6 || !avatarImage
            }
            onClick={
              isLogin
                ? async () => {
                    try {
                      await signInEmail();
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }
                : async () => {
                    try {
                      await signUpEmail();
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }
            }
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <p onClick={() => setOpenModal(true)}>パスワードを忘れた場合</p>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "アカウントを作成" : "ログイン画面に戻る"}
          </p>
        </div>
        <Modal
          css={authBox__Modal}
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <div css={authBox__ModalIn}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              type="email"
              name="email"
              label="Reset E-mail"
              value={resetEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setResetEmail(e.target.value);
              }}
            />
            <IconButton onClick={sendResetEmail}>
              <SendIcon />
            </IconButton>
          </div>
        </Modal>
      </section>
    </Layout>
  );
};

const authBox = css`
  margin: 100px auto;
  padding: 50px 0;
  background-color: #e2dedb;
  width: 100%;
  max-width: 1200px;

  h2 {
    padding: 20px 0;
    font-size: 26px;
    text-align: center;
    color: #b3aca7;
  }

  h3 {
    font-size: 24px;
    text-align: center;
    color: #b3aca7;
  }

  .authBox__box {
    p {
      text-align: center;
      cursor: pointer;
    }

    button {
      margin: 10px auto;
      padding: 10px 10px;
      display: block;
      width: 280px;
      background-color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      outline: none;

      &:hover {
        opacity: 0.7;
      }
    }
  }

  .authBox__boxIcon {
    label {
      width: 100%;
      cursor: pointer;
    }

    input {
      display: none;
    }
  }

  .auth__boxIconSelected {
    margin: 0 auto;
    display: block;

    input {
      display: none;
    }

    p {
      margin: 10px;
      font-size: 18px;
    }
  }
`;

const inputBox = css`
  margin: 0 auto;
  /* background-color: skyblue; */
  width: fit-content;

  input {
    width: 260px;
    border: none;
  }
`;

const authBox__Modal = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 500px;
`;

const authBox__ModalIn = css`
  padding: 120px 0;
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  text-align: center;
`;
