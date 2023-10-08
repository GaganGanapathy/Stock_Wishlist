import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteStock } from "../redux/wishlistSlice"
import "../styles/Wishlist.css"
import { v4 } from "uuid"

function Wishlist() {
  const dispatch = useDispatch()
  const wishlists = useSelector((state) => {
    return state.wishlist.stocks
  })

  return (
    <div
      style={{ backgroundColor: "#1CA7EC", height: "100vh" }}
      className="mt-2 mt-md-0"
    >
      <h1>Wishlist</h1>
      <ul>
        {wishlists?.map((wishlist) => {
          return (
            <li
              key={v4()}
              className="text-black d-flex justify-content-between p-2 mb-2 rounded"
            >
              <span className="ps-1 fw-medium">{wishlist.name}</span>
              <span className="fw-semibold">{wishlist.price}</span>
              <span
                className="pe-1"
                onClick={() => dispatch(deleteStock(wishlist))}
              >
                <i className="fa-solid fa-trash"></i>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Wishlist
