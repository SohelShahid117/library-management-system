import React, { useEffect, useState } from "react";
import { useBooks } from "../../context/BookContext";
import Hero from "../../components/Hero";
import Shop from "./../shop/Shop";

const Home = () => {
  const { books, currentBook, loading, error } = useBooks();
  console.log(books);
  /*
  const [books, setBooks] = useState({});
  useEffect(() => {
    // const responseData = () => fetch("http://localhost:3000/books");
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      //   .then((data) => console.log(data.books));
      .then((data) => setBooks(data.books));
  }, []);
  console.log(books);
  */
  return (
    <div>
      {/* {books.map((book) => (
        <div key={book._id}>{book.title}</div>
      ))} */}

      {/* Homee */}
      <Hero />
      <Shop />
    </div>
  );
};

export default Home;
