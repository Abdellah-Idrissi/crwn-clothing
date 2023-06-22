import SignIn from "./SignIn";
import Login from "./Login";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Authentication() {
  let user = useSelector(state=> state.user.user)
  
  if (user !== null) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-wrap gap-[70px] my-9 sm:my-14 md:px-5">
      <Login />
      <SignIn />
    </div>
  );
}
