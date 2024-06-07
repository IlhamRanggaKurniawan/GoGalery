import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

const Contact = ({ id, group, name }: { id: number, group: boolean, name: string }) => {
  return (
    <Link href={group ? `/group/${id}` : `/messages/${id}`} className="h-14 flex items-center gap-3 p-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <h4 className="truncate">{name}</h4>
    </Link>
  );
};

export default Contact;
