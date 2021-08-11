import React, { useState, useMemo } from 'react'
import Layout from "../components/Layout"
import { useAuth } from '../hooks/useAuth';
import utilStyles from '../styles/login.module.css'


const  Login = () => {
  const [userID, setUserID] = useState();
  // const onChangeuserID = (e) => setUserID(e.target.value);

  const { login } = useAuth();

  const onClickLogin = () => login(userID);

  return useMemo(() =>
    <Layout>
      <section className={utilStyles.login}>
        <h2>Welcome</h2>
        <div className={utilStyles.login__box}>
          <input placeholder="PassWord" value={userID} onChange={(e) => {setUserID(e.target.value)}} />
          <button type="button" onClick={onClickLogin}>Login</button>
        </div>
      </section>
    </Layout>
  ,[])
}
export default Login