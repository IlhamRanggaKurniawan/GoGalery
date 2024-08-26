import DirectConversation from "@/components/myComponents/messages/DirectConversation";
import Avatar from "@/components/newDesign/Avatar";
import ConversationHeader from "@/components/newDesign/ConversationHeader";
import Header from "@/components/newDesign/Header";
import Message from "@/components/newDesign/Message";
import MessageInput from "@/components/newDesign/MessageInput";
import PrivateConversation from "@/components/newDesign/PrivateConversation";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
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

  const { user } = await getSession()


  const directMessage = await api.get(`/dm/findone/${params.id}`, { cache: "no-cache" })

  console.log(directMessage)

  const otherParticipantUsername = user.id === directMessage.Participant1ID ? directMessage.Participant2.Username : directMessage.Participant1.Username


  return (
    <div className="mt-14">
      <ConversationHeader name={otherParticipantUsername} />
      <PrivateConversation conversationId={+params.id} prevMessage={directMessage.Messages}/>
    </div>
  );
};

export default page;
