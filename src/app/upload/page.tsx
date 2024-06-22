import HeadMetaData from "@/components/myComponents/HeadMetaData";
import UploadInput from "@/components/myComponents/UploadInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "upload content | Connect Verse",
  description: "Welcome to the Connect Verse upload content page",
  openGraph: {
    title: "upload content | Connect Verse",
    description: "Welcome to the Connect Verse upload content page",
    url: "https://ConnectVerse.com/upload",
  },
  twitter: {
    card: "summary_large_image",
    title: "upload content | Connect Verse",
    description: "Welcome to the Connect Verse upload content page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/upload" metaDataDescription="upload content page" title="upload content" />
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
        <UploadInput />
      </div>
    </>
  );
};

export default page;
