import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import InviteMembersDialog from "./InviteMembersDialog";
import GroupInfoDialog from "./GroupInfoDialog";

const ConversationHeader = ({ group, name, id }: { group: boolean; name: string; id?: number }) => {
  return (
    <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-56 gap-4 pr-6 z-10 border-b-2 justify-between">
      <div className="flex gap-4">
        <Link href={`${group ? "/group" : "/messages"}`}>
          <ChevronLeft size={40} />
        </Link>
        {group ? (
          <div className="flex items-center max-w-[80%]">
            <GroupInfoDialog id={id}>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <h1 className="font-medium truncate">{name}</h1>
              </div>
            </GroupInfoDialog>
          </div>
        ) : (
          <Link href={`/${name}`} className="flex items-center gap-3 max-w-[80%]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <h1 className="font-medium truncate">{name}</h1>
          </Link>
        )}
      </div>
      {group && (
        <InviteMembersDialog id={id}>
          <UserRoundPlus />
        </InviteMembersDialog>
      )}
    </div>
  );
};

export default ConversationHeader;
