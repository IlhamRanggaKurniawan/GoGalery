import ContentMain from "@/components/myComponents/content/ContentMain";
import SearchBar from "@/components/myComponents/SearchBar";
import SearchSheet from "@/components/myComponents/SearchSheet";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 flex items-center justify-center">
      <SearchSheet>
        <SearchBar />
      </SearchSheet>
      <div className="grid grid-cols-3 gap-[2px] m-1 mt-12 sm:mt-2">
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
        <Link href="/explore/123" className="max-w-80">
          <ContentMain />
        </Link>
      </div>
    </div>
  );
};

export default page;
