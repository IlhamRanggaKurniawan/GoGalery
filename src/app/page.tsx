import StraightInfiniteScroll from "@/components/newDesign/content/StraightInfiniteScroll";
import Header from "@/components/newDesign/Header";
import { Bell } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "GoGalery",
  description: "Welcome to the GoGalery homepage.",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "GoGalery",
    description: "Welcome to the GoGalery homepage.",
    url: "https://gogalery.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoGalery",
    description: "Welcome to the GoGalery homepage.",
    images: ["https://example.com/image.jpg"],
  },
};

const page = async () => {

  return (
    <>
      <div className="sm:hidden">
        <Header>
          <div className="h-14 w-full flex justify-between items-center px-4">
            <h2 className="text-xl font-semibold">GoGalery</h2>
            <Link href={"/notifications"}>
              <Bell size={30} />
            </Link>
          </div>
        </Header>
      </div>
      <div className="mt-12 sm:mt-0">
      <StraightInfiniteScroll />
      </div>
    </>
  );
};

export default page;

