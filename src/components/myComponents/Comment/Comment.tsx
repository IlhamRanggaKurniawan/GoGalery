"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import React from "react";
import CommentDialog from "./CommentDialog";
import { useSession } from "next-auth/react";

const Comment = ({ text, username, createdAt, uploader, commentId }: { text: string; username: string; createdAt: Date; uploader: string; commentId: number }) => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          <div className="leading-[8px]">
            {uploader === username ? <span className="text-sm font-medium mr-2 text-cyan-400">{username}</span> : <span className="text-sm font-medium mr-2">{username}</span>}
            <span className="text-sm">{text}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs">{new Date(createdAt).toLocaleString().split(",")[1]}</span>
        {session?.user.role === "admin" || session?.user.username === uploader || username === session?.user.username && (
          <CommentDialog commentId={commentId}>
            <Ellipsis className="text-xs" size={16} />
          </CommentDialog>
        )}
      </div>
    </div>
  );
};

export default Comment;
