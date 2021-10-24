import React, { useState, FC } from "react";
import { Layout } from "../components/Layout";
import utilStyles from "../styles/login.module.css";
import { useDispatch } from "react-redux";
import { auth, storage } from "../firebas/initFirebase";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, passWord);
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, passWord);
  };

  return (
    <Layout>
      <section className={utilStyles.login}>
        <h2>Welcome</h2>
        <h3>{isLogin ? "Login" : "Register"}</h3>
        <div className={utilStyles.login__box}>
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
            <p>For get passWord?</p>
            <p onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create new account ?" : "Back to Login"}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
