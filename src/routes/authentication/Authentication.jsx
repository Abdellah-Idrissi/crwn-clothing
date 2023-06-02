import SignIn from "./SignIn"
import Login from "./Login"
import { useAuthContext } from "../../contexts/AuthContext"
import { Navigate } from "react-router-dom"

export default function Authentication() {

  let user = useAuthContext()


  if(user !== null) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="flex flex-wrap gap-[70px] my-9 sm:my-14 md:px-5">
      <Login/>
      <SignIn/>
    </div>
  )
}
