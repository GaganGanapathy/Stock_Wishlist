import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  stocks: [],
}

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addStock: (state, action) => {
      const isStockInWishlist = state.stocks.some(
        (stock) => stock.symbol === action.payload.symbol
      )

      if (!isStockInWishlist) {
        state.stocks.push(action.payload)
      }
    },
    deleteStock: (state, action) => {
      state.stocks = state.stocks.filter((stock) => {
        return stock.symbol !== action.payload.symbol
      })
    },
  },
})

export const { addStock, deleteStock } = wishlistSlice.actions
export default wishlistSlice.reducer
