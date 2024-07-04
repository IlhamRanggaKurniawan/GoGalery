import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Group chat | Connect Verse",
  description: "Welcome to the Connect Verse Group chat page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Group chat | Connect Verse",
    description: "Welcome to the Connect Verse Group chat page",
    url: "https://ConnectVerse.com/Group",
  },
  twitter: {
    card: "summary_large_image",
    title: "Group chat | Connect Verse",
    description: "Welcome to the Connect Verse Group chat page",
  },
};

const page = () => {
  return (
    <>
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
