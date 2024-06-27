"use client";

import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import EditMessageDialog from "./EditMessageDialog";

const ChatBubble = ({ message, senderId, id, ai }: { message: string; senderId?: number; id: number; ai?: boolean }) => {
  const { data: session } = useSession();

  if (!session) {
    return;
  }

  return (
    <div>
      {senderId === session.user.id ? (
        <div className="flex py-1 justify-end items-center gap-1 group">
          {!ai && (
            <EditMessageDialog id={id}>
              <div className="hidden group-hover:flex items-center cursor-pointer">
                <EllipsisVertical size={15} />
              </div>
            </EditMessageDialog>
          )}
          <div className="w-fit px-4 py-2 max-w-[60%] rounded-lg bg-blue-300 text-white break-words text-sm rounded-ee-none whitespace-pre-wrap">{message}</div>
        </div>
      ) : (
        <div className="flex py-1 justify-start">
          <div className="w-fit px-4 py-2 max-w-[60%] rounded-lg bg-slate-400 text-white break-words text-sm rounded-ss-none whitespace-pre-wrap">{message}</div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
