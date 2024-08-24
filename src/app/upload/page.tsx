import UploadInput from "@/components/newDesign/UploadInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Upload content | Connect Verse",
  description: "Welcome to the Connect Verse Upload content page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Upload content | Connect Verse",
    description: "Welcome to the Connect Verse Upload content page",
    url: "https://ConnectVerse.com/Upload",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload content | Connect Verse",
    description: "Welcome to the Connect Verse Upload content page",
  },
};

const page = () => {
  return (
      <div>
        <UploadInput />
      </div>
  );
};

export default page;
