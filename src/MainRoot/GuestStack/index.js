import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";
import SliderComponent from "./Pages/Reusable/Slider";
import { useState } from "react";

export default function GuestStack() {
  // global
  // cart
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("@cartArr")
      ? JSON.parse(localStorage.getItem("@cartArr"))
      : []
  );

  // catalog filter
  const [currentCatalogFilter, setCurrentCatalogFilter] = useState(null);
  //

  return (
    <div className="App-Container">
      <NavComponent
        cartItemsArr={cartItems}
        currentCatalogFilter={currentCatalogFilter}
        setCurrentCatalogFilter={setCurrentCatalogFilter}
      />
      <SliderComponent />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setCartItems={(quantity) => {
                setCartItems(quantity);
              }}
              currentCatalogFilter={currentCatalogFilter}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}
