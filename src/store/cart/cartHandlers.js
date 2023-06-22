import { toast } from "react-toastify"
import { store } from "../store"
import Swal from "sweetalert2"
import { fetchDataAndMergeIt, saveDataToFirestoreForLoggedInUser, saveDataToFirestoreForUnknownUser, updateProductsAfterFetching } from "../../helpers"
import { closeDropDown, resetCart, toggleDropDown, updateProducts } from "./cartSlice"


export const updateCartBasedOnUserState = ()=> {
  let uuid = localStorage.getItem('uuid')
  let user = store.getState().user.user

  if(!user && !uuid) store.dispatch(resetCart())

  else if (user && !uuid) updateProductsAfterFetching(user.uid)

  else if (uuid && !user) updateProductsAfterFetching(uuid)

  else if (user && uuid) fetchDataAndMergeIt(user.uid)

}

export let saveData = (theCartProcuts, numOfProducts) => {
  let user = store.getState().user.user
  let uuid = localStorage.getItem("uuid")

  // IF USER NOT AND UUID TO THEN WE NEED TO CREATE THE UUID
  if (!user && !uuid) {
    localStorage.setItem("uuid", crypto.randomUUID());
    uuid = localStorage.getItem("uuid");
  }


  // IF USER NOT LOGGED IN SAVE DATA UNDER HIS UUID IN FIRESTORE
  if (!user) saveDataToFirestoreForUnknownUser(uuid,theCartProcuts,numOfProducts)

  // IF USER LOGGED IN AND UUID NOT FOUND SAVE DATA UNDER HIS UID IN FIRESTORE
  else if(user) saveDataToFirestoreForLoggedInUser(user.uid,theCartProcuts,numOfProducts)

}

export let changeOpenState = () => {
  store.dispatch(toggleDropDown())
}

export let closeDropDownOnBodyClick = (e) => {
  let {isDropDownOpen} = store.getState().cart
  
  if (!e.target.classList.contains("dropdown")) {
    isDropDownOpen && store.dispatch(closeDropDown())
  }
}

export let addProductToCart = async (product) => {
  let cartProducts = store.getState().cart.cartProducts
  let numOfProductsInCart = store.getState().cart.numOfProductsInCart

  let { imageUrl, name, price, id } = product;

  // ADD THE NUMBER OF PRODUCTS IN CARTS IN ALL CASES
  let numOfProducts = numOfProductsInCart + 1;

  let newCartProducts = [];

  // CHECK IF THIS PRODUCT ALREADY IN THE DROPDOWN OR NO
  let productIndex = cartProducts.findIndex(
    (product) => product.name === name
  );

  // IF THE PRODUCT IS NOT IN THE DROPDOWN
  if (productIndex === -1) {
    newCartProducts = [...cartProducts, { imageUrl, name, price, id, quantity: 1 }];
    toast.success(`${name} added to cart`);
  }

  // IF THE PRODUCT IS ALREADY IN THE DROPDOWN
  else {
    newCartProducts = JSON.parse(JSON.stringify(cartProducts))
    newCartProducts[productIndex].quantity += 1;
  }

  store.dispatch(updateProducts({products:newCartProducts,numOfProducts}))

  saveData(newCartProducts, numOfProducts);
}

export let decreaseQuantityOfProduct = (productIndex) => {
  let {numOfProductsInCart,cartProducts} = store.getState().cart

  let newCartProducts, numOfProducts;

  if (cartProducts[productIndex].quantity > 1) {
    // EDIT THE PRODUCTS
    newCartProducts = JSON.parse(JSON.stringify(cartProducts))
    newCartProducts[productIndex].quantity -= 1;

    // DECREMENT THE NUMBER OF PRODUCTS IN CART
    numOfProducts = numOfProductsInCart - 1;

    store.dispatch(updateProducts({products:newCartProducts,numOfProducts}))

    // SAVE THE NEW PRODUCTS DATA IN FIRESTORE
    saveData(newCartProducts, numOfProducts);
  }
}

export let removeProductFromCart = async (productIndex) => {
  let {numOfProductsInCart,cartProducts} = store.getState().cart

  let result = await Swal.fire({
    title: "Do you want to remove this product?",
    showCancelButton: true,
    color:'#212529',
    width: "fit-content",
    confirmButtonColor: "#ba181b",
    cancelButtonColor: "#808282",
    confirmButtonText: "Yes, remove!",
  });

  if (result.isConfirmed) {
    let productQuantity = cartProducts[productIndex].quantity;

    let newCartProducts = JSON.parse(JSON.stringify(cartProducts))

    newCartProducts.splice(productIndex, 1);

    numOfProductsInCart -= productQuantity;
    let numOfProducts = numOfProductsInCart;

    store.dispatch(updateProducts({products:newCartProducts,numOfProducts}))

    saveData(newCartProducts, numOfProducts);

    toast.success("You removed the product");
  }
}

export let countTotalPrice = () => {
  let {cartProducts} = store.getState().cart
  
  let total = 0;

  cartProducts.map((product) => {
    total += product.price * product.quantity;
  });

  return total;
}