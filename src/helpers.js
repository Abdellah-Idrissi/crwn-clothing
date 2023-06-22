import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { store } from "./store/store"
import { resetCart, updateProducts } from "./store/cart/cartSlice"

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

export let fetchAndReturnUserData = async (docId)=> {
  let docRef = doc(db,'users',docId)
  let userDoc = await getDoc(docRef)

  if(!userDoc.exists()) {
    return {cartProductsInDb:undefined,numOfProductsInDb:undefined}
  }

  let {cartProducts,numOfProducts} = userDoc.data()
  return {cartProductsInDb:cartProducts,numOfProductsInDb:numOfProducts}
}

export let updateProductsAfterFetching = async (docId)=> {
  let {cartProductsInDb,numOfProductsInDb} = await fetchAndReturnUserData(docId)

  cartProductsInDb !== undefined ? 
  store.dispatch(updateProducts({products:cartProductsInDb,numOfProducts:numOfProductsInDb})): 
  store.dispatch(resetCart())
}

export let mergeProducts = (uuidProducts,dbProducts)=> {
  let products = []

  for (let i = 0 ; i < uuidProducts.length; i++) {
    let uuidProduct = uuidProducts[i]
    let productIndex = dbProducts.findIndex(product=> product.name === uuidProduct.name)
    if(productIndex !== -1) products.push({...uuidProduct , quantity:uuidProduct.quantity + dbProducts[productIndex].quantity})
    else products.push(uuidProduct)
  }

  for (let i = 0 ; i < dbProducts.length; i++) {
    let dbProduct = dbProducts[i]
    let isProductFound = products.findIndex(product=> product.name === dbProduct.name)
    if(isProductFound === -1) products.push(dbProduct)
  }

  return products
}

export let fetchDataAndMergeIt = async (docId)=> {
  let {cartProductsInDb,numOfProductsInDb} = await fetchAndReturnUserData(docId)
  let {cartProducts,numOfProductsInCart} = store.getState().cart


  if(cartProductsInDb) {
    let products = mergeProducts(cartProducts,cartProductsInDb)
    let numOfProducts = +numOfProductsInCart + +numOfProductsInDb
    store.dispatch(updateProducts({products,numOfProducts}))
    await deleteDoc(doc(db, "users", localStorage.getItem('uuid')))
    localStorage.removeItem('uuid')
    let docRef = doc(db,'users',docId)
    await updateDoc(docRef,{cartProducts:products,numOfProducts})
  }

  else {
    await deleteDoc(doc(db, "users", localStorage.getItem('uuid')))
    localStorage.removeItem('uuid')
    let docRef = doc(db,'users',docId)
    await updateDoc(docRef,{cartProducts,numOfProducts:numOfProductsInCart})
  }
}

export let saveDataToFirestoreForUnknownUser = async (uuid,theCartProcuts,numOfProducts)=> {
  let userDocRef = doc(db, "users", uuid);
  setDoc(userDocRef, { cartProducts: theCartProcuts, numOfProducts});
}

export let saveDataToFirestoreForLoggedInUser = async (uid,theCartProcuts,numOfProducts)=> {
  let userDocRef = doc(db, "users", uid);
  updateDoc(userDocRef, { cartProducts: theCartProcuts, numOfProducts});
}