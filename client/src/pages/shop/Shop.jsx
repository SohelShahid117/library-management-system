import React from "react";
import BookGrid from "./BookGrid";
import { useBooks } from "../../context/BookContext";
import axios from "axios";
import CategoryNav from "./CategoryNav";

const Shop = () => {
  const {
    books,
    loading,
    error,
    fetchBooks,
    filters,
    pagination,
    updateFilters,
  } = useBooks();

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`${baseUrl}/books/${id}`);
      alert("Book deleted successfully");
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === "All Collections" ? "" : category,
      page: 1,
    });
  };

  const categories = [
    "All Collections",
    "Fiction",
    "Adventure",
    "Romance",
    "Dystopian",
    "Historical",
    "Non-Fiction",
  ];
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div>
        <CategoryNav
          categories={categories}
          activeCategory={filters.genre || "All Collections"}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/*result summary*/}
      <div className="py-4 text-gray-600 px-4">
        Showing
        {pagination.totalBooks > 0
          ? (pagination.currentPage - 1) * filters.limit + 1
          : 0}
        -
        <span>
          {Math.min(
            pagination.currentPage * filters.limit,
            pagination.totalBooks
          )}
        </span>{" "}
        of {pagination.totalBooks} books
      </div>

      {/*books card*/}
      <div className="py-8 md:px-4">
        <BookGrid
          books={books}
          loading={loading}
          error={error}
          onDeleteBook={handleDeleteBook}
        />
      </div>
    </div>
  );
};

export default Shop;
