import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";
import SliderComponent from "./Pages/Reusable/Slider";

export default function GuestStack() {
  return (
    <div className="App-Container">
      <NavComponent />
      <SliderComponent />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
