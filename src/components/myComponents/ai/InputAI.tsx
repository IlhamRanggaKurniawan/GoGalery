"use client";

import { Input } from "@/components/ui/input";
import { IAIMessage, ITextMessage, sendChat, textGeneration } from "@/lib/actions/ai";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const InputAI = ({
  conversationId,
  setMessage,
  setPrompt,
  prompt,
}: {
  conversationId: number;
  prompt: ITextMessage[];
  setMessage: React.Dispatch<React.SetStateAction<IAIMessage[]>>;
  setPrompt: React.Dispatch<React.SetStateAction<ITextMessage[]>>;
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!session) return;

      if (prompt.length > 5) {
        prompt.shift();
        prompt.shift();
      }

      const chat = await sendChat({ userId: session.user.id, conversationId, message: input });

      setMessage((prev) => [...prev, chat]);

      prompt.push({ role: "user", content: input });


      const tes = await textGeneration({ id: chat.id, messages: prompt });

      if (!tes) return;

      setMessage((prev) => {
        const newMessages = prev.slice(0, -1);
        return [...newMessages, tes?.data];
      });

      setLoading(false);
      setPrompt(tes.messages);
      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-16 fixed bottom-0 left-0 w-screen z-50 px-2 items-center flex bg-background sm:pl-16 md:pl-20 lg:pl-60 pr-4 py-2">
      <form className="flex gap-2 w-screen" onSubmit={handleSubmit}>
        <Input placeholder="Message..." type="text" required className="rounded-full" onChange={(e) => setInput(e.target.value)} value={input} disabled={loading} />
        <button>
          <Send size={25} />
        </button>
      </form>
    </div>
  );
};

export default InputAI;
