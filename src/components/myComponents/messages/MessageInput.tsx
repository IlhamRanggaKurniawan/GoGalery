"use client";

import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions/messaging";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";

const MessageInput = ({ id }: { id: number }) => {

  const { data: session } = useSession();
  const [text, setText ] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      const message = await sendMessage({ directMessageId: id, message: text, senderId: session.user.id });

      console.log(message)
        
      setText("")
    }
  };

  return (
    <div className="h-16 fixed bottom-0 left-0 w-screen z-50 px-2 items-center flex bg-background sm:pl-18 md:pl-20 lg:pl-60 pr-4 py-2">
      <form className="flex gap-2 w-screen" onSubmit={handleSubmit}>
        <Input placeholder="Message..." type="text" required className="rounded-full" onChange={(e) => setText(e.target.value)} value={text}/>
        <button>
          <Send size={25} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
