import HeadMetaData from "@/components/myComponents/HeadMetaData";
import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import { Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "messages | Connect Verse",
  description: "Welcome to the Connect Verse upload messages page",
  openGraph: {
    title: "messages | Connect Verse",
    description: "Welcome to the Connect Verse upload messages page",
    url: "https://ConnectVerse.com/messages",
  },
  twitter: {
    card: "summary_large_image",
    title: "messages | Connect Verse",
    description: "Welcome to the Connect Verse upload messages page",
  },
};

const page = () => {
  return (
    <>
    <HeadMetaData pathname="/messages" title="messages" metaDataDescription="Connect verse messages page"/>
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
