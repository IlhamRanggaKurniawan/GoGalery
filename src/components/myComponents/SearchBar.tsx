import React from "react";
import Link from "next/link";

const SearchBar = () => {
  return (
    <Link className="w-screen h-12 flex items-center fixed top-0 right-0 bg-background sm:hidden" href="/explore/search">
      <div className="mx-2 h-8 w-screen border flex items-center rounded-sm px-3 font-light text-sm">Search</div>
    </Link>
  );
};

export default SearchBar;
