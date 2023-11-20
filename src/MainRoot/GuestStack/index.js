import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";
import SliderComponent from "./Pages/Reusable/Slider";
import { useState } from "react";

export default function GuestStack() {
  // global
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("@cartArr")
      ? JSON.parse(localStorage.getItem("@cartArr"))
      : []
  );
  //

  return (
    <div className="App-Container">
      <NavComponent cartItemsArr={cartItems} />
      <SliderComponent />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCartItems={(quantity) => {
                setCartItems(quantity);
              }}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
