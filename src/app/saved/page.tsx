import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import { getSavedContent } from "@/lib/actions/save";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Saved content | Connect Verse",
  description: "Welcome to the Connect Verse Saved content page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Saved content | Connect Verse",
    description: "Welcome to the Connect Verse Saved content page",
    url: "https://ConnectVerse.com/Saved",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saved content | Connect Verse",
    description: "Welcome to the Connect Verse Saved content page",
  },
};

const page = () => {
  return (
    <>
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
