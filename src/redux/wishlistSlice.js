import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  wishlist: [],
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addStock: (state, action) => {
      state.wishlist = state.wishlist.unshift(action.payload)
    },
    deleteStock: (state, action) => {
      state.wishlist = state.wishlist.filter((stock) => {
        stock["1. symbol"] != action.payload["1. symbol"]
      })
    },
  },
})

export const { addStock, deleteStock } = wishlistSlice.actions
export default wishlistSlice.reducer
