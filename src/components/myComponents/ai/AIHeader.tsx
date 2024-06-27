import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AIHeader = () => {
  return (
    <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-56 gap-4 pr-6 z-10 border-b-2 justify-between">
      <div className="flex gap-4">
        <Link href="/messages">
          <ChevronLeft size={40} />
        </Link>
        <div className="flex items-center gap-3 max-w-[80%]">
          <Avatar>
            <AvatarImage src="/openAI.jpeg" alt="@shadcn" />
            <AvatarFallback>Open AI</AvatarFallback>
          </Avatar>
          <h1 className="font-medium truncate">Open AI</h1>
        </div>
      </div>
    </div>
  );
};

export default AIHeader;
