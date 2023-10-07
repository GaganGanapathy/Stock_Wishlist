import HomeScreen from "./components/HomeScreen"
import Wishlist from "./components/Wishlist"
import "./App.css"

function App() {
  return (
    <div className="row">
      <div className="col-md-7 col-12 text-center border border-primary homescreen">
        <HomeScreen />
      </div>
      <div className="col-md-5 col-12 text-center">
        <Wishlist />
      </div>
    </div>
  )
}

export default App
