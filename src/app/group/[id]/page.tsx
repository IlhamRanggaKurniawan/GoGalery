import GroupConversation from "@/components/myComponents/messages/GroupConversation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Group chat | Connect Verse",
  description: "Welcome to the Connect Verse Group chat page",
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

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0">
        <GroupConversation id={+params.id} />
      </div>
    </>
  );
};

export default page;
