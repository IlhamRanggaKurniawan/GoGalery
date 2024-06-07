import ChatBubble from "@/components/myComponents/messages/ChatBubble";
import ConversationHeader from "@/components/myComponents/messages/ConversationHeader";
import MessageInput from "@/components/myComponents/messages/MessageInput";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return;
  }
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <ConversationHeader group name="mancing" />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {/* <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} />
        <ChatBubble start />
        <ChatBubble start={false} /> */}
      </div>
      <MessageInput id={id} />
    </div>
  );
};

export default page;
