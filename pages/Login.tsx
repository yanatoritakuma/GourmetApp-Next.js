import React, { useState, useMemo, FC, ChangeEvent } from 'react';
import Layout from "../components/Layout";
import { useAuth } from '../hooks/useAuth';
import utilStyles from '../styles/login.module.css';
import { useDispatch } from "react-redux";
import { loginIDStates } from "../provider/dishesSlice";

const Login:FC = () => {
  const [ userID, setUserID ] = useState("");
  const { login } = useAuth();
  const dispatch = useDispatch();
  const onChangeUserID = (e: ChangeEvent<HTMLInputElement>) => setUserID(e.target.value);

  const onClickLogin = () => {
    login(userID);
    dispatch(loginIDStates(userID));
  }

  return useMemo(() =>
    <Layout>
      <section className={utilStyles.login}>
        <h2>Welcome</h2>
        <div className={utilStyles.login__box}>
          <p>
            ※1〜10でログインできます。<br />
            3でログインをすると管理者としてログインでき削除機能が使用可能です。
          </p>
          <input placeholder="PassWord" value={userID} onChange={onChangeUserID} />
          <button type="button" disabled={userID === "" ? true : false} onClick={onClickLogin}>Login</button>
        </div>
      </section>
    </Layout>
  ,[userID])
}
export default Login
