import { createSlice } from "@reduxjs/toolkit"

const initial_state = {
  user:undefined
}

const userSlice = createSlice({
  name:'user',
  initialState:initial_state,
  reducers: {
    setUser: (state,action)=> {
      state.user = action.payload
    }
  }
})

export const userReducer = userSlice.reducer
export const {setUser} = userSlice.actions