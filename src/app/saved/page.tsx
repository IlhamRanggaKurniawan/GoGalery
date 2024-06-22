import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import { getSavedContent } from "@/lib/actions/save";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "saved content | Connect Verse",
  description: "Welcome to the Connect Verse upload saved content page",
  openGraph: {
    title: "saved content | Connect Verse",
    description: "Welcome to the Connect Verse upload saved content page",
    url: "https://ConnectVerse.com/saved",
  },
  twitter: {
    card: "summary_large_image",
    title: "saved content | Connect Verse",
    description: "Welcome to the Connect Verse upload saved content page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/saved" metaDataDescription="saved content page" title="saved content" />
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 ">
        <div className="bg-secondary w-full h-12 flex items-center justify-center">
          <h2 className="font-semibold text-lg">Saved Content</h2>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="max-w-[1000px]">
            <GridContentInfinityScroll contentFuction={getSavedContent} href="saved" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
