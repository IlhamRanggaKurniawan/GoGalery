"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { getDirectMessageData, IMessage } from "@/lib/actions/messaging";
import ConversationHeader from "./ConversationHeader";
import { useSession } from "next-auth/react";
import MessageInput from "./MessageInput";
import Pusher from "pusher-js";
import { IUserPreview } from "@/lib/actions/user";

const DirectConversation = ({ id }: { id: number }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  const getConversation = async () => {
    if (!session) return;

    const { data } = await getDirectMessageData({ directMessageId: id });

    if (!data) return;

    setMessages(data.message);

    setUsers(data.participants);
  };

  useEffect(() => {
    getConversation();

    const sound = new Audio("/message.mp3");

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe(`dm-${id}`);

    channel.bind("new-message", (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (message.senderId !== session?.user.id) {
        sound.play().catch((error) => console.log("Error playing sound:", error));
      }
    });

    channel.bind("delete-message", (data: IMessage) => {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== data.id));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, id]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!users.some((user) => user.id === session?.user.id)) return;

  const otherParticipant = users.find((user) => user.id !== session?.user.id);

  if (!otherParticipant) return;

  return (
    <div className="overflow-y-hidden">
      <ConversationHeader group={false} name={otherParticipant.username} profilePicture={otherParticipant.profileUrl}/>
      <div className="pt-16 sm:py-16 overflow-y-auto px-2 h-full">
        {messages?.map((message, index) => (
          <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <ChatBubble message={message.message} senderId={message.senderId} id={message.id} />
          </div>
        ))}
      </div>
      <MessageInput id={id} group={false} />
    </div>
  );
};

export default DirectConversation;
