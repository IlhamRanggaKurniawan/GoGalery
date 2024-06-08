import GroupConversation from "@/components/myComponents/messages/GroupConversation";
import MessageInput from "@/components/myComponents/messages/MessageInput";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return;
  }
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <GroupConversation id={id}/>      
      <MessageInput id={id} group/>
    </div>
  );
};

export default page;
