import { initializeApp } from "firebase/app"
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEaAoVqHIJIKINB7XwSKdN_liXkSGa9DU",
  authDomain: "crwn-cloting-4c1dc.firebaseapp.com",
  projectId: "crwn-cloting-4c1dc",
  storageBucket: "crwn-cloting-4c1dc.appspot.com",
  messagingSenderId: "715701449367",
  appId: "1:715701449367:web:bb5af52b843572082eefd2"
};




const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)



