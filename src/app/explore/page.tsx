import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import SearchBar from "@/components/myComponents/SearchBar";
import SearchSheet from "@/components/myComponents/SearchSheet";
import { getAllContent } from "@/lib/actions/content";
import React from "react";

const page = async () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 flex items-center justify-center">
      <SearchSheet>
        <SearchBar />
      </SearchSheet>
      <div className="max-w-[1000px] mt-12 sm:mt-0">
        <GridContentInfinityScroll contentFuction={getAllContent} />
      </div>
    </div>
  );
};

export default page;
