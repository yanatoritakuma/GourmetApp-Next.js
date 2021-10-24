import React, { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../provider/userSlice";
import { auth } from "../firebas/initFirebase";
import Registration from "./Registration";
import { Auth } from "../components/Auth";

const Login = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            dispalayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return <>{user.uid ? <Registration /> : <Auth />}</>;
};
export default Login;
