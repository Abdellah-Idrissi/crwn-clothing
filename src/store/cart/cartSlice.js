import { createSlice } from "@reduxjs/toolkit"

let initial_state = {
  numOfProductsInCart: undefined,
  isDropDownOpen:false,
  cartProducts:[]
}

const cartSlice = createSlice({
  name:'cart',
  initialState:initial_state,
  
  reducers: {
    toggleDropDown: (state)=> {
      state.isDropDownOpen = !state.isDropDownOpen
    },

    closeDropDown: (state)=> {
      state.isDropDownOpen = false
    },

    updateProducts: (state,action)=> {
      state.cartProducts = action.payload.products
      state.numOfProductsInCart = action.payload.numOfProducts
    },

    resetCart: (state)=> {
      state.numOfProductsInCart = 0,
      state.isDropDownOpen = false,
      state.cartProducts = []
    }
  }
})


export const {toggleDropDown , closeDropDown , updateProducts , resetCart} = cartSlice.actions
export const cartReducer = cartSlice.reducer



