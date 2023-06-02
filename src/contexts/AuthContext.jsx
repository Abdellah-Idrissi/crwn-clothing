import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { auth } from '../../firebase'
import Loading from '../components/Loading'

const authContext = createContext()

export default function AuthContext() {

  let [user,setUser] = useState()

  useEffect(()=> {
    let authObserver = onAuthStateChanged(auth,(user)=> {
      setUser(user)
    })

    return authObserver
  },[])


  return (
    <>
      <authContext.Provider value={user}>
        {user === undefined ? <Loading/> : <Outlet/>}
      </authContext.Provider>
    </>
  )
}



export const useAuthContext = ()=> useContext(authContext)