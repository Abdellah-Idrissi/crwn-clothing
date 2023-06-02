import { createContext, useContext, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useAuthContext } from "./AuthContext"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import Loading from "../components/Loading"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const cartContext = createContext()

export default function CartContext() {
  let [numOfProducsInCart,setNumOfProducsInCart] = useState()
  let [isDropDownOpen,setIsDropDownOpen] = useState(false)
  let [cartProducts,setCartProducts] = useState([])
  let user = useAuthContext()

  let changeOpenState = ()=> {
    setIsDropDownOpen(!isDropDownOpen)
  }

  let closeDropDownOnBodyClick = (e)=> {
    if(!e.target.classList.contains('dropdown')) {
      isDropDownOpen && setIsDropDownOpen(false)
    }
  }

  let addProductToCart = async (product)=> {
    let {imageUrl , name , price , id} = product

    let newCartProducts = []

    // CHECK IF THIS PRODUCT ALREADY IN THE DROPDOWN OR NO 
    let productIndex = cartProducts.findIndex(product => product.name === name)


    // IF THE PRODUCT IS NOT IN THE DROPDOWN 
    if(productIndex === -1) {
      newCartProducts = [...cartProducts,{imageUrl,name,price,id,quantity:1}]
      setCartProducts(newCartProducts)
      toast.success(`${name} added to cart`)
    }

    // IF THE PRODUCT IS ALREADY IN THE DROPDOWN
    else {
      cartProducts[productIndex].quantity += 1
      newCartProducts = cartProducts
      setCartProducts(newCartProducts)
    }

    // ADD THE NUMBER OF PRODUCTS IN CARTS IN ALL CASES
    let numOfCarts = numOfProducsInCart + 1
    setNumOfProducsInCart(numOfCarts)

    saveData(newCartProducts,numOfCarts)

  }

  let decreaseQuantityOfProduct = (productIndex)=> {
    let newCartProducts , numOfCarts


    if(cartProducts[productIndex].quantity > 1 ) {

      // EDIT THE PRODUCTS
      cartProducts[productIndex].quantity -= 1
      newCartProducts = cartProducts
      setCartProducts(cartProducts)

      // DECREMENT THE NUMBER OF PRODUCTS IN CART
      numOfCarts = numOfProducsInCart - 1
      setNumOfProducsInCart(numOfCarts)

      // SAVE THE NEW PRODUCTS DATA IN FIRESTORE
      saveData(newCartProducts,numOfCarts)

    }

  }

  let removeProductFromCart = async (productIndex)=> {

    let result = await Swal.fire({
      title: 'Do you want to remove this product?',
      showCancelButton: true,
      width:'fit-content',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove!',
    })

    if(result.isConfirmed) {
      let productQuantity = cartProducts[productIndex].quantity
  
      cartProducts.splice(productIndex,1)
      let newCartProducts = cartProducts
      setCartProducts(cartProducts)
  
      numOfProducsInCart -= productQuantity
      let numOfCarts = numOfProducsInCart
      setNumOfProducsInCart(numOfProducsInCart)
  
      saveData(newCartProducts,numOfCarts)

      toast.success('You removed the product')
    }

  }

  let saveData = (theCartProcuts,numOfCarts)=> {
    let uuid = localStorage.getItem('uuid')

    // IF USER NOT FOUND AS WELL AS UUID THEN WE NEED THE UUID
    if(!user && !uuid) {
      localStorage.setItem('uuid',crypto.randomUUID())
      uuid = localStorage.getItem('uuid')
    }

    // IF USER NOT LOGGED IN SAVE DATA UNDER HIS UUID IN FIRESTORE
    if(!user) {
      let userDocRef = doc(db,'users',uuid)
      setDoc(userDocRef,
        {cartProducts:theCartProcuts,
        numOfCarts}
        )
    }


  }

  let countTotalPrice = ()=> {

    let total = 0

    cartProducts.map(product=> {
      total += product.price * product.quantity
    })


    return total
  }

  let value = {
    numOfProducsInCart,
    setNumOfProducsInCart,
    isDropDownOpen,
    cartProducts,
    setCartProducts,
    changeOpenState,
    closeDropDownOnBodyClick,
    addProductToCart,
    decreaseQuantityOfProduct,
    removeProductFromCart,
    countTotalPrice
  }

  useEffect( ()=> {
    let uuid = localStorage.getItem('uuid')

    let getCartProducts = async ()=> {
      let userDocRef = doc(db,'users',uuid)
      let userDoc = await getDoc(userDocRef)
      setNumOfProducsInCart(userDoc.data().numOfCarts)
      setCartProducts(userDoc.data().cartProducts)
    }

    if(!user && uuid !== null) {
      getCartProducts()
    }

    else {
      setNumOfProducsInCart(0)
    }

  },[user,setCartProducts])

  
  return (
    <cartContext.Provider value={value}>
      {numOfProducsInCart === undefined ? <Loading/> : <Outlet/>}
    </cartContext.Provider>
  )
}

export const useCartContext = ()=> useContext(cartContext)