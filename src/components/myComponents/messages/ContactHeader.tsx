import { ChevronLeft, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import FindContactDialog from "./FindContactDialog";
import CreateGroupDialog from "./CreateGroupDialog";

const ContactHeader = ({ group }: { group: boolean }) => {
  return (
    <div>
      {group ? (
        <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-60 gap-4 pr-6 z-10 border-b-2 justify-between">
          <div className="flex items-center">
            <Link href="/messages" className="sm:hidden">
              <ChevronLeft size={40} />
            </Link>
            <h1 className="text-lg font-medium">Group Chat</h1>
          </div>
          <CreateGroupDialog>
            <MessageSquarePlus size={28} />
          </CreateGroupDialog>
        </div>
      ) : (
        <div>
          <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-60 px-6 z-10 border-b-2 justify-between">
            <h1 className="text-lg font-medium">Private Chat</h1>
            <FindContactDialog>
              <MessageSquarePlus size={28} />
            </FindContactDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactHeader;
