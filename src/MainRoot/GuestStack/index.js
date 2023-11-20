import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";
import SliderComponent from "./Pages/Reusable/Slider";
import { useState } from "react";

export default function GuestStack() {
  // global
  const [cartItemsQuantity, setCartItemsQuantity] = useState(
    JSON.parse(localStorage.getItem("@cartArr")).length || 0
  );
  //

  return (
    <div className="App-Container">
      <NavComponent cartItemsQuantity={cartItemsQuantity} />
      <SliderComponent />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCartItemsQuantity={(quantity) => {
                setCartItemsQuantity(quantity);
              }}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
