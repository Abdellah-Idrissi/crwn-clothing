import { useRef, useState } from "react"
import Button from "../../components/Button"
import { toast } from "react-toastify"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { GoogleProvider, auth, db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { checkValueLength, storeUserInFirestore } from "../../helpers"

export default function Login() {

  let emailRef = useRef()
  let passwordRef = useRef()
  let [logInLoading,setLoginInLoading] = useState(false)


  let logInUser = async (e)=> {
    e.preventDefault()
    let email = emailRef.current.value.trim()
    let pass = passwordRef.current.value.trim()

    // Some checking before sending the request to the server
    if(email === '' || pass === '') {
      return toast.error(`Please fill all the inputs`,{toastId:'fillInputs2'})
    }

    // log in the user
    try{
      setLoginInLoading(true)
      await signInWithEmailAndPassword(auth,email,pass)
      toast.success('You logged in succesfully',{toastId:'loginSuccess'})
      setLoginInLoading(false)
    }
    catch({code}){
      setLoginInLoading(false)
      if(code === 'auth/user-not-found') {
        toast.error('This account is not registered',{toastId:'notregis2'})
      }
      else if(code === 'auth/wrong-password') {
        toast.error('The password is wrong !',{toastId:'passwrong2'})
      }
      else if(code === 'auth/invalid-email') {
        toast.error('Email is not valid',{toastId:'emailnovalid2'})
      }
    }


  }

  let continueWithGoogle = async ()=> {
    let uid , name , email 

    // handle google sign in
    try{
      let reponse = await signInWithPopup(auth,GoogleProvider)
      uid = reponse.user.uid
      name = reponse.user.displayName
      email = reponse.user.email
      toast.success('You signed in succesfuly',{toastId:'googleSuccess'})
    }
    catch({code}){
      if(code === 'auth/popup-closed-by-user') toast.error('Operation did not finished , you closed the popup!',{toastId:'didntfinish'})
      console.log(code)
      return 
    }


    let userDocRef = doc(db,'users',uid) // get user document reference 
    let userDoc = await getDoc(userDocRef) // get the user document (not reference)

    // If we are not storing user's data in firestore it means this is the user's first time then we need to store its data in it
    if(!userDoc.exists()) {
      await storeUserInFirestore(userDocRef,name,email)
    }



  }



  return (
    <div className="w-full sm:w-[40%] grow">

      <h2 className="font-semibold text-[21px]">I already have an account</h2>
      <p className="mb-10 my-1 text-[14px]">Log in with your email and password</p>

      <form onSubmit={logInUser} >

        <div className="relative mb-9">
          <input type="email" className="input" ref={emailRef} onChange={checkValueLength} />
          <span>email</span>
        </div>

        <div className="relative"> 
          <input type="password" className="input" ref={passwordRef} onChange={checkValueLength} />
          <span>password</span>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-4 mt-[30px]">
          <Button btnType='first' loadingState={logInLoading}>
            {logInLoading ? 'loggin in...' : 'log in'}
          </Button>
          <Button btnType='google' type='button' addedStyles={'w-fit px-6'} onClick={continueWithGoogle}>continue with google</Button>
        </div>

      </form>

    </div>
  )
}
