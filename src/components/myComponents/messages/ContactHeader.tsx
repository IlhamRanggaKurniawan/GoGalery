import React from "react";

const ContactHeader = ({ group }: { group: boolean }) => {
  return (
      <div className="h-14 flex items-center fixed top-0 sm:left-16 md:left-20 lg:left-56 bg-background px-6 z-10 border-b-2 border-r-2 w-96">
        <h1 className="text-lg font-medium">{group ? "Group Chat" : "Private Chat"}</h1>
      </div>
  );
};

export default ContactHeader;
