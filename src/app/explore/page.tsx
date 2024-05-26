import ContentMain from "@/components/myComponents/content/ContentMain";
import SearchBar from "@/components/myComponents/SearchBar";
import SearchSheet from "@/components/myComponents/SearchSheet";
import { getAllContent, IContent } from "@/lib/actions/content";
import Link from "next/link";
import React from "react";

const page = async() => {
    const contents = await getAllContent()

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 flex items-center justify-center">
      <SearchSheet>
        <SearchBar />
      </SearchSheet>
      <div className="grid grid-cols-3 gap-[2px] m-1 mt-12 sm:mt-2">
      {contents ? contents.map((content : IContent) => (
          <Link href={`/explore/${content.id}`} key={content.id} className="max-w-80">
              <ContentMain url={content.url} alt={content.caption} preview={true}/>
          </Link>
        )): (
          <span className="text-red-600 font-semibold ">Something went wrong</span>
        )}
      </div>
    </div>
  );
};

export default page;
