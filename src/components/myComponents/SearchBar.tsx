import React from "react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="w-screen h-12 flex items-center fixed top-0 right-0 bg-background sm:hidden">
      <Input className="mx-2 h-8 w-screen " type="text" placeholder="Search"/>
    </div>
  );
};

export default SearchBar;
