import Content from "@/components/myComponents/content/Content";
import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import {  profileChainingContent } from "@/lib/actions/content";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const generateMetadata = ({params} : {params : {username: string}}): Metadata => {
  return {
    title: `${params.username} | Connect Verse`,
    description: `Welcome to ${params.username} Post page`,
    keywords:"connect, verse, social media",
    authors: [{name: "Connect Verse team"}],
    openGraph: {
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} Post page`,
      url: "https://ConnectVerse.com",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} Post page`,
    },
  }
}

const page = async ({ params }: { params: { id: string; username: string } }) => {
 return (
  <div></div>
 )
};

export default page;
