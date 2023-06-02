import { useRef, useState } from "react"
import Button from "../../components/Button"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase"
import { doc } from "firebase/firestore"
import { checkValueLength, storeUserInFirestore } from "../../helpers"

export default function SignIn() {

  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  let confirmPasswordRef = useRef()
  let [signInLoading,setSignInLoading] = useState(false)


  let signUpAndRegistreUserInFirestore = async (e)=> {
    e.preventDefault()
    let name = nameRef.current.value.trim()
    let email = emailRef.current.value.trim()
    let pass = passwordRef.current.value.trim()
    let confirmPass = confirmPasswordRef.current.value.trim()
    let uid

    // Some checking before sending the request to the server
    if(name === '' || email === '' || pass === '' || confirmPass === '') {
      return toast.error(`Please fill all the inputs`,{toastId:'fillInputs'})
    }
    if(pass !== confirmPass) {
      return toast.error('Passwords are not the same',{toastId:'passNotSame'})
    }


    // First sign in the user and handle this proccess
    try{
      setSignInLoading(true)
      let response = await createUserWithEmailAndPassword(auth,email,pass)
      uid = response.user.uid
      toast.success('You signed in succesfully',{toastId:'signIn'})
      setSignInLoading(false)
    }
    catch({code}){
      if(code === 'auth/email-already-in-use') toast.error('Email already in use',{toastId:'inuser'})
      else if(code === 'auth/weak-password') toast.error('Password is not strong',{toastId:'strongpass'})
      else if(code === 'auth/invalid-email') toast.error('Email is invalid',{toastId:'invalidemail'})
      setSignInLoading(false)
      return
    }


    // If the sign in is done then store the user's data in firestore
    let userDocRef = doc(db,'users',uid)
    await storeUserInFirestore(userDocRef,name,email)


  }



  return (
    <div className="w-full sm:w-[40%] grow">

      <h2 className="font-semibold text-[21px]">I do not have an account</h2>
      <p className="mb-10 my-1 text-[14px]">Sign up with your email and password</p>

      <form onSubmit={signUpAndRegistreUserInFirestore} >

        <div className="relative">
          <input type="text" className="input" ref={nameRef} onChange={checkValueLength} />
          <span>display name</span>
        </div>

        <div className="relative my-9"> 
          <input type="email" className="input" ref={emailRef} onChange={checkValueLength} />
          <span>email</span>
        </div>

        <div className="relative my-9">
          <input type="password" className="input" ref={passwordRef} onChange={checkValueLength} />
          <span>password</span>
        </div>

        <div className="relative">
          <input type="password" className="input" ref={confirmPasswordRef} onChange={checkValueLength} />
          <span>confirm password</span>
        </div>

        <Button btnType='first' loadingState={signInLoading} addedStyles={'mt-[30px]'}>
          {signInLoading ? 'signing in...' : 'sign in'}
        </Button>

      </form>

    </div>
  )
}
