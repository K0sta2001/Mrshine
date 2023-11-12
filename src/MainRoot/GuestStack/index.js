import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NavComponent from "./Pages/Reusable/Nav";

export default function GuestStack() {
  return (
    <div className="App-Container">
      <NavComponent />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}
