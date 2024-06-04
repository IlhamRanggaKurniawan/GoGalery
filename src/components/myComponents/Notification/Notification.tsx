import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Notification = ({ username, content, createdAt }: { username: string, content: string, createdAt: Date }) => {
  return (
    <div>
      <div className="flex gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex items-center">
          <div className="leading-[8px]">
            {/* <span className="text-sm font-medium mr-2">{username}</span> */}
            <span className="">{content}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs">{new Date(createdAt).toLocaleString().split(",")[1]}</span>
      </div>
    </div>
  );
};

export default Notification;
