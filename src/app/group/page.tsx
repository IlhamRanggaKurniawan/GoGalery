import HeadMetaData from "@/components/myComponents/HeadMetaData";
import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "group chat | Connect Verse",
  description: "Welcome to the Connect Verse upload group chat page",
  openGraph: {
    title: "group chat | Connect Verse",
    description: "Welcome to the Connect Verse upload group chat page",
    url: "https://ConnectVerse.com/group",
  },
  twitter: {
    card: "summary_large_image",
    title: "group chat | Connect Verse",
    description: "Welcome to the Connect Verse upload group chat page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/group" metaDataDescription="GroupChat page" title="group chat" />
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 pt-14">
        <ContactHeader group />
        <div>
          <ContactList group />
        </div>
      </div>
    </>
  );
};

export default page;
