import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProductsFromFirebase } from "./productsHandlers"

const initial_state = {
  loading:true,
  error:false,
  products:[]
}

export const fetchProducts = createAsyncThunk('products/fetchProducts',async ()=> {
  const data = await fetchProductsFromFirebase()
  return data
})

const productsSlice = createSlice({
  name:'products',
  initialState:initial_state,
  extraReducers: (builder)=> {

    builder.addCase(fetchProducts.fulfilled,(state,action)=> {
      state.loading = false
      state.products = action.payload
    })

    builder.addCase(fetchProducts.rejected,(state)=> {
      state.loading = false
      state.error = true
    })
    
  }
})

export const productsReducer = productsSlice.reducer


