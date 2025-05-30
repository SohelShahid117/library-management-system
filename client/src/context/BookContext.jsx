import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
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
  const [pagination, setPagination] = useState({
    totalBooks: 0,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          params.append(key, value);
        }
      });

      const response = await axios.get(`${baseUrl}/books?${params}`);
      setBooks(response.data.books);
      setPagination({
        currentPage: response.data.currentPage,
        totalBooks: response.data.totalBooks,
        totalPages: response.data.totalPages,
      });
      //   console.log(response.data);
    } catch (error) {
      // console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const clearCurrentBooks = useCallback(() => {
    setBooks(null);
  }, []);
  const updateFilters = useCallback(async (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // page: newFilters.hasOwnProperty("page") ? newFilters.page : 1,
    }));
  }, []);

  const fetchBookDetails = useCallback(async (bookId) => {
    try {
      setLoading(true);
      setError(null);
      // const response = await axios.get(`${baseUrl}/books?search=${bookId}`);
      // console.log(response.data);
      // setCurrentBook(response.data);
      // console.log(currentBook);

      const response = await axios.get(`${baseUrl}/books/${bookId}`);
      setCurrentBook(response.data);
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [filters]);
  console.log(books);

  const value = {
    books,
    currentBook,
    loading,
    errors,
    filters,
    pagination,
    fetchBooks,
    clearCurrentBooks,
    updateFilters,
    fetchBookDetails,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("useBooks must be within a Book provider");
  }
  return context;
};
