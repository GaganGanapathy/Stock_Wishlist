import React, { useState, useEffect } from "react"
import axios from "axios"
import { v4 } from "uuid"
import "../styles/Homescreen.css"
import { useDispatch } from "react-redux"
import { addStock } from "../redux/wishlistSlice"

function Home() {
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const getData = setTimeout(async () => {
      const options = {
        method: "GET",
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/sc/search/${input}`,
        headers: {
          "X-RapidAPI-Key":
            "d7664246d9msh1d9d9f2da772bc7p1e484ajsndf9bb51da438",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      }

      try {
        const response = await axios.request(options)
        const suggestionsData = response.data.body

        // Fetch stock prices for suggestions
        const pricePromises = suggestionsData.map((suggestion) =>
          stockPrice(suggestion.symbol)
        )

        const prices = await Promise.all(pricePromises)

        // Combine suggestions with stock prices
        const suggestionsWithPrices = suggestionsData.map(
          (suggestion, index) => ({
            ...suggestion,
            price: prices[index],
          })
        )

        setSuggestions(suggestionsWithPrices)
      } catch (error) {
        console.log(error)
        setSuggestions([])
      }
    }, 2000)
    // const fetchData = async () => {

    // }

    // fetchData()
    return () => clearInterval(getData)
  }, [input])

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const stockPrice = async (symbol) => {
    try {
      const options = {
        method: "GET",
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
        headers: {
          "X-RapidAPI-Key":
            "d7664246d9msh1d9d9f2da772bc7p1e484ajsndf9bb51da438",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      }

      const response = await axios.request(options)
      console.log(response.data[0].regularMarketPrice)
      const result = response.data[0].regularMarketPrice
      return result
    } catch (error) {
      console.log(error)
      return null
    }
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
        {suggestions?.map((suggestion) => (
          <li
            key={v4()}
            className="text-black d-flex justify-content-between p-2 mb-2 rounded"
          >
            <span className=" ps-1 fw-medium">{suggestion.name} </span>
            <span className="fw-semibold">{suggestion.price}</span>
            <span
              className="add pe-1"
              onClick={() => dispatch(addStock(suggestion))}
            >
              <i className="fa-solid fa-plus"></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
