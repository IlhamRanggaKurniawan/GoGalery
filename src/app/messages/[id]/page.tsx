import DirectConversation from "@/components/myComponents/messages/DirectConversation";
import Avatar from "@/components/newDesign/Avatar";
import Header from "@/components/newDesign/Header";
import Message from "@/components/newDesign/Message";
import MessageInput from "@/components/newDesign/MessageInput";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Messages | Connect Verse",
  description: "Welcome to the Connect Verse Messages page",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
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
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <div className="flex gap-2 items-center">
            <ChevronLeft size={30} />
            <div className="h-12 w-12">
              <Avatar profilePicture={null} username="tes" />
            </div>
          </div>
          <h2>Ilham Rangga</h2>
        </div>
      </Header>
      <div className="h-fit overflow-y-auto">
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
        <Message senderId={1} message="lorem100" />
        <Message senderId={2} message="lorem100asdas" />
        <Message senderId={3} message="lorem100asddas" />
      </div>
      <MessageInput value="" />
    </div>
  );
};

export default page;
