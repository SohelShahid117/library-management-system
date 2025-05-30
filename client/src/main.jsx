import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import EditBook from "./pages/editBook/EditBook.jsx";
import BookDetails from "./pages/bookDetails/BookDetails.jsx";
import AddBook from "./pages/addBook/AddBook.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/books" element={<div>Shop</div>}></Route> */}
        <Route path="/books" element={<Shop />}></Route>
        <Route path="/books/edit/:id" element={<EditBook />}></Route>
        <Route path="/books/:id" element={<BookDetails />}></Route>
        <Route path="/books/add" element={<AddBook />}></Route>
        <Route path="/ebooks" element={<div>Ebooks</div>}></Route>
        <Route path="/membership" element={<div>Membership</div>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
