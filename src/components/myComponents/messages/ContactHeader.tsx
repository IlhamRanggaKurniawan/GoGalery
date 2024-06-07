import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ContactHeader = ({ group }: { group: boolean }) => {
  return (
    <div>
    {group ? (
      <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-60 gap-4 pr-6 z-10 border-b-2">
        <Link href="/messages" className="sm:hidden">
          <ChevronLeft size={40} />
        </Link>
        <h1 className="text-lg font-medium">Group Chat</h1>
      </div>
    ) : (
      <div>
        <div className="w-full h-14 flex items-center fixed top-0 left-0 bg-background sm:pl-16 md:pl-20 lg:pl-60 px-6 z-10 border-b-2">
          <h1 className="text-lg font-medium">Private Chat</h1>
        </div>
      </div>
    )}
  </div>
  );
};

export default ContactHeader;
