import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { X } from "lucide-react";

const AccountPreview = ({ username }: { username: string }) => {
  return (
    <div className="flex items-center sm:hover:bg-secondary rounded-md p-1 px-2 justify-between ">
      <SheetClose asChild className="w-full max-w-[70%]">
        <Link href={`/${username}`} className="flex items-center cursor-pointer gap-3">
          <Avatar className="h-11 w-11">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>ilham</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <h3 className="truncate">{username}</h3>
            <h4 className="text-sm text-slate-500 truncate">{username}</h4>
          </div>
        </Link>
      </SheetClose>
      <X className="cursor-pointer" />
    </div>
  );
};

export default AccountPreview;
