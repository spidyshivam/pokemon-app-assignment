import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
