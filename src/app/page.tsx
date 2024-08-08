import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import HomePageBar from "@/components/myComponents/HomePageBar";
import Navbar from "@/components/newDesign/Navbar";
import { getContentByFollowing } from "@/lib/actions/content";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse homepage.",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse homepage.",
    url: "https://ConnectVerse.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse homepage.",
    images: ["https://example.com/image.jpg"],
  },
};

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <HomePageBar />
      <div className="flex flex-col gap-4 pt-12 sm:pt-0 w-full">
        <StraightContentInfinityScroll contentFuction={getContentByFollowing} homePage/>
      </div>
      <Navbar />
    </div>
  );
};

export default page;
