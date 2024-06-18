"use client";

import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { getDirectMessageData } from "@/lib/actions/messaging";
import ConversationHeader from "./ConversationHeader";
import { useSession } from "next-auth/react";
import MessageInput from "./MessageInput";
import Pusher from "pusher-js";

const DirectConversation = ({ id }: { id: number }) => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const getConversation = async () => {
    if (session) {
      const res = await getDirectMessageData({ directMessageId: id });

      if (res) {
        setMessages(res.message);

        setUsers(res.participants);
      }
    }
  };

  useEffect(() => {
    getConversation();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    })

    const channel = pusher.subscribe(`dm-${id}`);
    channel.bind('new-message', (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    channel.bind('delete-message', (data: { id: number }) => {
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== data.id));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, id]);

  const isUserAuthorized = () => {
    return users.some((user) => user.id === session?.user.id);
  };

  if (!isUserAuthorized()) {
    return  null
  }

  const otherParticipant = users.find((user) => user.id !== session?.user.id)?.username;

  return (
    <div className="flex flex-col">
      <ConversationHeader group={false} name={otherParticipant} />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {messages ? messages.map((message) => <ChatBubble key={message.id} message={message.message} senderId={message.senderId} id={message.id}/>) : <div></div>}
      </div>
      <MessageInput id={id} group={false}/>
    </div>
  );
};

export default DirectConversation;
