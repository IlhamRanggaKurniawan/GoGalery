import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SearchBar from "@/components/myComponents/SearchBar";
import SearchSheet from "@/components/myComponents/SearchSheet";
import { getAllContent } from "@/lib/actions/content";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "explore | Connect Verse",
  description: "Welcome to the Connect Verse upload explore page",
  openGraph: {
    title: "explore | Connect Verse",
    description: "Welcome to the Connect Verse upload explore page",
    url: "https://ConnectVerse.com/group",
  },
  twitter: {
    card: "summary_large_image",
    title: "explore | Connect Verse",
    description: "Welcome to the Connect Verse upload explore page",
  },
};

const page = async () => {
  return (
    <>
    <HeadMetaData pathname="/explore" metaDataDescription="Connect Verse explore page" title="explore page"/>
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
