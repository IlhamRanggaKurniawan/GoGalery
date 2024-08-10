import SearchUser from "@/components/myComponents/SearchUser";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Explore | Connect Verse",
  description: "Welcome to the Connect Verse Explore page",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
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

const page = () => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Search</h1>
        <Link href="/explore">
          <X />
        </Link>
      </div>
      <SearchUser />
    </div>
  );
};

export default page;
