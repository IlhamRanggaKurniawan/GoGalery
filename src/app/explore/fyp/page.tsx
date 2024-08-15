import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import HomePageBar from "@/components/myComponents/HomePageBar";
import Content from "@/components/newDesign/Content";
import Navbar from "@/components/newDesign/Navbar";
import { getContentByFollowing } from "@/lib/actions/content";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
import axios from "axios";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse homepage.",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
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

const page = async () => {


  const contents = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/content/findall`, {
    withCredentials: true
  })

  return (
    <div >
      <div className=" overflow-y-auto flex flex-col items-center">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </div>
  );
};

export default page;
