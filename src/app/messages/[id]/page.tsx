import DirectConversation from "@/components/myComponents/messages/DirectConversation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messages | Connect Verse",
  description: "Welcome to the Connect Verse Messages page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
    url: "https://ConnectVerse.com/Messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messages | Connect Verse",
    description: "Welcome to the Connect Verse Messages page",
  },
};

const page = async ({ params }: { params: { id: string } }) => {

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <DirectConversation id={+params.id} />
    </div>
  );
};

export default page;
