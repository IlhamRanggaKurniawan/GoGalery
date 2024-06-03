import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Comment = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>ilham</AvatarFallback>
      </Avatar>
      <div className="flex items-center">
        <div className="leading-[8px]">
          <span className="text-sm font-medium mr-2">ilham</span>
          <span className="text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
