import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import { Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

const page = () => {
  return (
    <>
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 pt-14">
      <ContactHeader group={false} />
      <div>
        <Link href="/group" className="h-14 flex items-center gap-3 p-2 border-b-2 sm:hidden">
          <Users />
          <h4 className="font-semibold text-lg">Group</h4>
        </Link>
        <ContactList group={false}/>
      </div>
    </div>
    </>
  );
};

export default page;
