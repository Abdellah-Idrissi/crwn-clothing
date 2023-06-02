import { setDoc } from "firebase/firestore"

export let storeUserInFirestore = async (userDocRef,name,email)=> {

  try{
    await setDoc(userDocRef,{
      email,
      name,
      createdAt: new Date()
    })
  
  }
  catch({code}){
    console.log(`Error occur while storing in firestore ${code}`)
  }
}

export let checkValueLength = (e)=> {
  e.target.value.length > 0 ? e.target.classList.add('stayUp') : e.target.classList.remove('stayUp')
}