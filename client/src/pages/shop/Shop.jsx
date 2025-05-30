import React from "react";
import BookGrid from "./BookGrid";
import { useBooks } from "../../context/BookContext";
import axios from "axios";
import CategoryNav from "./CategoryNav";
import SortBooks from "./SortBooks";
import Pagination from "./Pagination";
import { baseUrl } from "../../../utils/baseUrl";

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
      console.log("deleted book", id);
      await axios.delete(`${baseUrl}/books/${id}`);
      alert("deleted book successfully");
      // console.log(baseUrl);
      fetchBooks();
    } catch (error) {
      console.log("Error deleting book" + error);
      alert("Error deleting book");
    }
  };

  const handleCategoryChange = (category) => {
    updateFilters({
      genre: category === "All Collections" ? "" : category,
      page: 1,
    });
  };
  const handleSortChange = (sortConfig) => {
    updateFilters({
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Add sorting controls */}
        <div className="py-4 flex justify-end  px-4">
          <SortBooks
            currentSort={{
              sortBy: filters.sortBy,
              order: filters.order,
            }}
            onSortChange={handleSortChange}
          />
        </div>
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

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Shop;
