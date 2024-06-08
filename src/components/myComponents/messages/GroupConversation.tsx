import React from "react";
import ConversationHeader from "./ConversationHeader";
import { getGroupData } from "@/lib/actions/messaging";
import ChatBubble from "./ChatBubble";

const GroupConversation = async ({ id }: { id: number }) => {
  const group = await getGroupData({ groupChatId: id });

  if(!group) {
    return
  }

  return (
    <div>
      <ConversationHeader group name={group.name} />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {group.message ? group.message.map((message) => <ChatBubble key={message.id} message={message.message} senderId={message.senderId} />) : <div></div>}
      </div>
    </div>
  );
};

export default GroupConversation;
