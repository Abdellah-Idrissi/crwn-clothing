import logger  from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import { cartReducer } from "./cart/cartSlice";
import { productsReducer } from "./products/productsSlice";

let middleWareArray = []
if(import.meta.env.MODE === 'development') middleWareArray.push(logger)


export const store = configureStore({
  reducer:{
    user:userReducer,
    cart:cartReducer,
    products:productsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}).concat(middleWareArray),

})


