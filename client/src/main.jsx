import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/books" element={<div>Shop</div>}></Route> */}
        <Route path="/books" element={<Shop />}></Route>
        <Route path="/books/add" element={<div>Add Books</div>}></Route>
        <Route path="/ebooks" element={<div>Ebooks</div>}></Route>
        <Route path="/membership" element={<div>Membership</div>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
