import Header from "./Reusable/Header";
import SideNav from "./Reusable/SideNav";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import CRUDProduct from "./pages/CRUDProduct";
import Users from "./pages/Users";

export default function Dashboard() {
  return (
    <div className="Admin-Dashboard">
      <Header />
      <div>
        <SideNav />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/CRUD" element={<CRUDProduct />}></Route>
          <Route path="/Users" element={<Users />}></Route>
        </Routes>
      </div>
    </div>
  );
}
