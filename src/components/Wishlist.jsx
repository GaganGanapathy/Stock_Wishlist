import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteStock } from "../redux/wishlistSlice"

function Wishlist() {
  const dispatch = useDispatch()
  const wishlists = useSelector((state) => {
    state.wishlist.wishlist
  })
  const stockPrice = async (symbol) => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=CUS2HY81PBSRW2NW`
    )
    console.log(response.data["Global Quote"]["05. price"])
    return response.data["Global Quote"]["05. price"]
  }

  return (
    <div
      style={{ backgroundColor: "#1CA7EC", height: "100vh" }}
      className="mt-2 mt-md-0"
    >
      <h1>Wishlist</h1>
      <ul>
        {/* {wishlists?.map((wishlist) => {
          return (
            <li
              key={v4()}
              className="text-black d-flex justify-content-around p-2 border-bottom border-primary"
            >
              <span>{wishlist["2. name"]}</span>
              <span>{stockPrice(wishlist["1. symbol"])}</span>
              <span onClick={() => dispatch(deleteStock(wishlist))}>
                <i className="fa-solid fa-trash" style={{ color: "#e4d107" }}></i>
              </span>
            </li>
          )
        })} */}
        <li className="text-black d-flex justify-content-around p-2 mb-2 rounded">
          <span>list1</span>
          <span>12.8723</span>
          <span>
            <i className="fa-solid fa-trash" style={{ color: "#e4d107" }}></i>
          </span>
        </li>
        <li className="text-black d-flex justify-content-around p-2 mb-2 rounded">
          <span>list1</span>
          <span>12.8723</span>
          <span>
            <i className="fa-solid fa-trash" style={{ color: "#e4d107" }}></i>
          </span>
        </li>
        <li className="text-black d-flex justify-content-around p-2 mb-2 rounded">
          <span>list1</span>
          <span>12.8723</span>
          <span>
            <i className="fa-solid fa-trash" style={{ color: "#e4d107" }}></i>
          </span>
        </li>
        <li className="text-black d-flex justify-content-around p-2 mb-2 rounded">
          <span>list1</span>
          <span>12.8723</span>
          <span>
            <i className="fa-solid fa-trash" style={{ color: "#e4d107" }}></i>
          </span>
        </li>
      </ul>
    </div>
  )
}

export default Wishlist
