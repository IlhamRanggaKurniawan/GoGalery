"use client";

import React, { useEffect, useRef, useState } from "react";
import InputAI from "./InputAI";
import ChatBubble from "../messages/ChatBubble";
import AIHeader from "./AIHeader";
import { getAIMessage, IAIMessage, ITextMessage } from "@/lib/actions/ai";

const AIConversation = ({ id }: { id: number }) => {
  const [messages, setMessage] = useState<IAIMessage[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState<ITextMessage[]>([]);

  const getChat = async () => {
    try {
      const chat = await getAIMessage({ id });

      setMessage(chat);

      if (!chat) return;

      const lastThreeMessages = chat.slice(-3);

      const formattedMessages: ITextMessage[] = lastThreeMessages.flatMap((message) => [
        { role: "user", content: message.message },
        { role: "assistant", content: message.response ?? "" },
      ]);

      setPrompt(formattedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChat();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
            <ChatBubble message={message.message} id={message.id} senderId={message.senderId} ai />
            {message.response && <ChatBubble message={message.response} id={message.id} ai />}
          </div>
        ))}
      </div>
      <InputAI conversationId={id} setMessage={setMessage} setPrompt={setPrompt} prompt={prompt} />
    </div>
  );
};

export default AIConversation;
