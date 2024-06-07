"use client"

import { useSession } from "next-auth/react";
import React from "react";

const ChatBubble = ({ message, senderId }: {  message: string, senderId: number  }) => {
  const {data : session} = useSession()

  if(!session) {
    return
  }

  return (
    <div>
      {senderId !== session.user.id ? (
        <div className="flex py-1 justify-end">
          <div className="w-fit px-4 py-2 max-w-[60%] rounded-lg bg-blue-300 text-white break-words text-sm rounded-ee-none">
            {message}
          </div>
        </div>
      ) : (
        <div className="flex py-1 justify-start">
          <div className="w-fit px-4 py-2 max-w-[60%] rounded-lg bg-slate-400 text-white break-words text-sm rounded-ss-none">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
