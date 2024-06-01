import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import { getSavedContent } from "@/lib/actions/save";
import React from "react";

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 ">
      <div className="bg-secondary w-full h-12 flex items-center justify-center">
        <h2 className="font-semibold text-lg">Saved Content</h2>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="max-w-[1000px]">
          <GridContentInfinityScroll contentFuction={getSavedContent} href="saved"/>
        </div>
      </div>
    </div>
  );
};

export default page;
