import React from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  return (
    <div className="searchbar  w-full h-3/4 mx-4 rounded-3xl flex items-center ">
      <input
        type="text"
        placeholder="Search"
        className="h-full w-full rounded-3xl pl-4"
      />
      <CiSearch size={30} className="CiSearch" />
    </div>
  );
}

export default SearchBar;
