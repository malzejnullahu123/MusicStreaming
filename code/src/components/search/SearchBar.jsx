import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Check if query is not empty after trimming whitespace
    // and does not start with a slash or backslash
    if (query.trim() !== "" && !/^[\/\\]/.test(query.trim())) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
      />
      <button type="submit" className="ml-2 p-1 rounded-full bg-primary text-white hidden md:block hover:bg-primary-dark focus:outline-none">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default SearchBar;
