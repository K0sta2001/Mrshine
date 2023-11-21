import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";
import SliderComponent from "./Pages/Reusable/Slider";
import { useState } from "react";
import Footer from "./Pages/Reusable/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

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

  // handle search
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const handleSearch = (word) => {
    setSearchKeyWord(word);
  };
  //

  // handle contact form popup
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  //

  return (
    <div className="App-Container">
      <NavComponent
        cartItemsArr={cartItems}
        currentCatalogFilter={currentCatalogFilter}
        setCurrentCatalogFilter={setCurrentCatalogFilter}
        handleSearch={handleSearch}
        setCartItems={setCartItems}
        setIsContactFormVisibleFunc={() => {
          setIsContactFormVisible(true);
        }}
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
              searchKeyWord={searchKeyWord}
            />
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Contact
        formVisible={isContactFormVisible}
        setIsContactFormVisibleFunc={() => {
          setIsContactFormVisible(false);
        }}
      />
      <Footer />
    </div>
  );
}
