import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ConversationHeader = ({ group,name }: { group: boolean, name: string }) => {
  return (
    <div className="w-screen h-14 flex items-center fixed top-0 bg-primary-foreground gap-4 pr-6 z-10 ">
      <Link href={`${group ? "/group" : "/messages"}`}>
        <ChevronLeft size={40} />
      </Link>
      <Link href={`/${name}`} className="flex items-center gap-3 max-w-[80%]">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <h1 className="font-medium truncate">{name}</h1>
      </Link>
    </div>
  );
};

export default ConversationHeader;
