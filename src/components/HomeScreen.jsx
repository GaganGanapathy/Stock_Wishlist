import React, { useState, useEffect } from "react"
import axios from "axios"
import { v4 } from "uuid"
import "../styles/Homescreen.css"
import { useDispatch } from "react-redux"
import { addStock } from "../redux/wishlistSlice"

function HomeScreen() {
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=CUS2HY81PBSRW2NW`
      )
      console.log(response.data.bestMatches)
      setSuggestions(() => response.data.bestMatches)
    }
    fetchData()
  }, [input])

  const handleInput = async (e) => {
    setInput(e.target.value)
  }

  const stockPrice = async (symbol) => {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=CUS2HY81PBSRW2NW`
    )
    console.log(response.data["Global Quote"]["05. price"])
    return response.data["Global Quote"]["05. price"]
  }

  return (
    <div>
      <h1 className="text-white">HomeScreen</h1>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        className="shadow form-control mt-3"
      />
      <ul>
        <li className="text-black d-flex justify-content-around p-2  mb-2 rounded">
          <span className="fw-medium">list1</span>
          <span className="fw-semibold">12.000</span>
          <span>
            <i className="fa-solid fa-plus"></i>
          </span>
        </li>
        <li className="text-black d-flex justify-content-around p-2 ">
          <span className="name">list1</span>
          <span className="price">12.000</span>
          <span className="add">
            <i className="fa-solid fa-plus"></i>
          </span>
        </li>
        {suggestions?.map((suggestion) => {
          return (
            <li
              key={v4()}
              className="text-black d-flex justify-content-around p-2  mb-2 rounded"
            >
              <span className="fw-medium">{suggestion["2. name"]} </span>
              <span className="fw-semibold">
                {stockPrice(suggestion["1. symbol"])}
              </span>
              <span
                className="add"
                onClick={() => dispatch(addStock(suggestion))}
              >
                <i className="fa-solid fa-plus"></i>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default HomeScreen

// D4X8C6EWV909J9BT
// CUS2HY81PBSRW2NW
// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
