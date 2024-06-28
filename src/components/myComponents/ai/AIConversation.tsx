"use client";

import React, { useEffect, useRef, useState } from "react";
import InputAI from "./InputAI";
import ChatBubble from "../messages/ChatBubble";
import AIHeader from "./AIHeader";
import { getAIMessage, IAIMessage } from "@/lib/actions/ai";

const AIConversation = () => {
  const [messages, setMessage] = useState<IAIMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const getChat = async () => {
    const chat = await getAIMessage({ id: 3 });
    
    setMessage(chat);
  };

  useEffect(() => {
    getChat();
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="overflow-y-hidden">
      <AIHeader />
      <div className="pt-16 sm:py-16 overflow-y-auto px-2 h-full">
        {messages?.map((message, index) => (
          <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <ChatBubble message={message.message} id={message.id} senderId={message.senderId} ai/>
            {message.response && <ChatBubble message={message.response} id={message.id} ai/>}
          </div>
        ))}
      </div>
      <InputAI conversationId={3} setMessage={setMessage}/>
    </div>
  );
};

export default AIConversation;
