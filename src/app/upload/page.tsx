import UploadInput from "@/components/newDesign/UploadInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Upload content | GoGalery",
  description: "Welcome to the GoGalery Upload content page",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "Upload content | GoGalery",
    description: "Welcome to the GoGalery Upload content page",
    url: "https://gogalery.com/Upload",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload content | GoGalery",
    description: "Welcome to the GoGalery Upload content page",
  },
};

const page = () => {
  return (
    <UploadInput />
  );
};

export default page;
