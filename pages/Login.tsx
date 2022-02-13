import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../provider/userSlice";
import { auth } from "../firebas/initFirebase";
import Registration from "./Registration";
import All from "./[category]";
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
  return (
    <>
      {user.uid === "YF2wQAnshNTklD0P0rUgGlo2P2v2" ? (
        <All category={"all"} />
      ) : user.uid ? (
        <Registration />
      ) : (
        <Auth />
      )}
    </>
  );
};
export default Login;
