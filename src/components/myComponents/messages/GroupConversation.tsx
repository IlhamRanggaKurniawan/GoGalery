"use client";

import React, { useEffect, useState } from "react";
import ConversationHeader from "./ConversationHeader";
import { getGroupData, IMessage } from "@/lib/actions/messaging";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { IUserPreview } from "@/lib/actions/user";

const GroupConversation = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const [groupName, setGroupName] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [member, setMember] = useState<IUserPreview[]>([])

  const getConversation = async () => {
    const { data } = await getGroupData({ groupChatId: id });

    if (!data) return;

    setGroupName(data.name);
    setMessages(data.message);
    setMember(data.member)
  };

  useEffect(() => {
    getConversation();
    const sound = new Audio("/message.mp3");

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe(`group-${id}`);

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

  if (!member.some((member: IUserPreview) => member.id === session?.user.id)) return;

  return (
    <div className="overflow-y-hidden">
      <ConversationHeader group name={groupName} id={id} />
      <div className="pt-16 sm:py-16 overflow-y-auto px-2 h-full">
        {messages.map((message: IMessage) => (
          <ChatBubble key={message.id} message={message.message} senderId={message.senderId} id={message.id} />
        ))}
      </div>
      <MessageInput id={id} group />
    </div>
  );
};

export default GroupConversation;
