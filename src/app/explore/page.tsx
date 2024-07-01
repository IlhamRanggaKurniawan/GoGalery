import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import SearchBar from "@/components/myComponents/SearchBar";
import SearchSheet from "@/components/myComponents/SearchSheet";
import { getAllContent } from "@/lib/actions/content";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore | Connect Verse",
  description: "Welcome to the Connect Verse Explore page",
  openGraph: {
    title: "Explore | Connect Verse",
    description: "Welcome to the Connect Verse Explore page",
    url: "https://ConnectVerse.com/group",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore | Connect Verse",
    description: "Welcome to the Connect Verse Explore page",
  },
};

const page = async () => {
  return (
    <>
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 flex items-center justify-center">
      <SearchSheet side="bottom">
        <SearchBar />
      </SearchSheet>
      <div className="max-w-[1000px] mt-12 sm:mt-0">
        <GridContentInfinityScroll contentFuction={getAllContent} href="explore"/>
      </div>
    </div>
    </>
  );
};

export default page;
