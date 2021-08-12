import React, { useState, useMemo } from 'react'
import Layout from "../components/Layout"
import { useAuth } from '../hooks/useAuth';
import utilStyles from '../styles/login.module.css'

const  Login = () => {
  const [ userID, setUserID ] = useState("");
  const disabled = true;
  const { login } = useAuth();
  const onClickLogin = () => login(userID);
  const onChangeUserID = (e) => setUserID(e.target.value);

  return useMemo(() =>
    <Layout>
      <section className={utilStyles.login}>
        <h2>Welcome</h2>
        <div className={utilStyles.login__box}>
          <p>※1〜10でログインできます。</p>
          <input placeholder="PassWord" value={userID} onChange={onChangeUserID} />
          <button type="button" disabled={userID === "" ? disabled : !disabled} onClick={onClickLogin}>Login</button>
        </div>
      </section>
    </Layout>
  ,[userID])
}
export default Login