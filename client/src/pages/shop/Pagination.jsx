import React from "react";
import { useBooks } from "../../context/BookContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPages, onPageChange }) => {
  // const Pagination = () => {
  //   const { filters, totalPages, nextPage, prevPage, updateFilters } = useBooks();
  return (
    <div className="flex items-center justify-center space-x-2">
      <button className="px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
        <FaChevronLeft />
      </button>
      <button>Pages</button>
      <button className="px-3 py-2 cursor-pointer rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
