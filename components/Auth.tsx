import React, { useState, FC } from "react";
import { Layout } from "../components/Layout";
import utilStyles from "../styles/login.module.css";
import { useDispatch } from "react-redux";
import { updeteUserProfile } from "../provider/userSlice";
import { auth, storage } from "../firebas/initFirebase";
import { IconButton, Modal, TextField } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";

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
      <section className={utilStyles.login}>
        <h2>Welcome</h2>
        <h3>{isLogin ? "Login" : "Register"}</h3>
        <div className={utilStyles.login__box}>
          {!isLogin && (
            <>
              <input
                id="userName"
                name="userName"
                placeholder="userName"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
              />

              <IconButton>
                <label>
                  <AccountCircleIcon fontSize="large" />
                  <input type="file" onChange={onChangeImageHandler} />
                </label>
              </IconButton>
            </>
          )}

          <input
            placeholder="EmailAddress"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="PassWord"
            value={passWord}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassWord(e.target.value);
            }}
          />
          <button
            type="button"
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
          </button>
          <div className={utilStyles.login__boxIn}>
            <p onClick={() => setOpenModal(true)}>For get passWord?</p>
            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create new account ?" : "Back to Login"}
            </p>
          </div>
        </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div>
            <div>
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
          </div>
        </Modal>
      </section>
    </Layout>
  );
};
