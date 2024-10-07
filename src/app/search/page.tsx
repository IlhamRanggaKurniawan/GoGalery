import SearchUser from "@/components/newDesign/SearchUser";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "GoGalery",
  description: "Welcome to the GoGalery",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "GoGalery",
    description: "Welcome to the GoGalery ",
    url: "https://gogalery.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoGalery",
    description: "Welcome to the GoGalery ",
  },
};

const page = () => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Search</h1>
        <Link href="/explore/fyp">
          <X />
        </Link>
      </div>
      <SearchUser />
    </div>
  );
};

export default page;
