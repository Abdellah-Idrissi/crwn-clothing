/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user/userSlice";

export default function UserListener({ children }) {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  useEffect(() => {
    let authObserver = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return authObserver;
  }, []);

  return <>{user === undefined ? <Loading /> : children}</>;
}
