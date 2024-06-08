"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { getDirectMessageData } from "@/lib/actions/messaging";
import ConversationHeader from "./ConversationHeader";
import { useSession } from "next-auth/react";

const DirectConversation = ({ id }: { id: number }) => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<any[]>([]);
  const [receiver, setReceiver] = useState("");

  const getConversation = async () => {
    if (session) {
      const res = await getDirectMessageData({ directMessageId: id });

      if (res) {
        setMessages(res.message);
        const receiver = res.participants.find((participant: { id: number }) => participant.id !== session?.user.id)?.username;
        if (receiver) {
          setReceiver(receiver);
        }
      }
    }
  };

  useEffect(() => {
    getConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex flex-col">
      <ConversationHeader group={false} name={receiver} />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {messages ? messages.map((message) => <ChatBubble key={message.id} message={message.message} senderId={message.senderId} />) : <div></div>}
      </div>
    </div>
  );
};

export default DirectConversation;
