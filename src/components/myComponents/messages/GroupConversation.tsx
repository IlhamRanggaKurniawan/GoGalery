"use client";

import React, { useEffect, useState } from "react";
import ConversationHeader from "./ConversationHeader";
import { getGroupData } from "@/lib/actions/messaging";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";

const GroupConversation = ({ id }: { id: number }) => {
  const { data: session } = useSession();
  const [group, setGroup] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const getConversation = async () => {
    const group = await getGroupData({ groupChatId: id });
    if (group) {
      setGroup(group);
      setMessages(group.message);
    }
  };

  useEffect(() => {
    if (!session) return;

    getConversation();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe(`group-${id}`);
    channel.bind('new-message', (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, id]);

  const isUserMember = () => {
    return group?.member.some((member: any) => member.id === session?.user.id);
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  if (!isUserMember()) {
    return null;
  }

  return (
    <div>
      <ConversationHeader group name={group.name} />
      <div className="py-16 overflow-y-scroll px-2 h-screen">
        {messages.length > 0 ? messages.map((message: any) => (
          <ChatBubble key={message.id} message={message.message} senderId={message.senderId} />
        )) : <div></div>}
      </div>
      <MessageInput id={id} group />
    </div>
  );
};

export default GroupConversation;
