import ChatBubble from "@/components/myComponents/messages/ChatBubble";
import ConversationHeader from "@/components/myComponents/messages/ConversationHeader";
import MessageInput from "@/components/myComponents/messages/MessageInput";
import { getAllMessage } from "@/lib/actions/messaging";
import React from "react";

const page = async({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return;
  }

  const messages = await getAllMessage({directMessageId: id})

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <ConversationHeader group={false} name="mancing" />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {messages ? messages.map((message) => (
          <ChatBubble key={message.id} message={message.message} senderId={message.senderId}/>
        )): (
          <div></div>
        )}
      </div>
      <MessageInput id={id} />
    </div>
  );
};

export default page;
