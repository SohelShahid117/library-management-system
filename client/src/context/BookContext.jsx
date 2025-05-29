import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  const [filters, setFiters] = useState({
    page: 1,
    limit: 8,
    genre: "",
    minYear: "",
    maxYear: "",
    price: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "title",
    order: "asc",
    search: "",
    author: "",
  });
  const [pagination, setPagination] = useState({});

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data.books);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  console.log(books);

  const value = { books, currentBook, loading };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be within a Book provider");
  }
  return context;
};
