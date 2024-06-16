import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AccountPreview = ({ username }: { username: string }) => {
  return (
    <div className="flex items-center sm:hover:bg-secondary rounded-md p-1 px-2 gap-2 w-full cursor-pointer">
      <Avatar className="h-11 w-11">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>ilham</AvatarFallback>
      </Avatar>
      <div className="overflow-hidden">
        <h3 className="truncate">{username}</h3>
        <h4 className="text-sm text-slate-500 truncate">{username}</h4>
      </div>
    </div>
  );
};

export default AccountPreview;
