import DirectConversation from "@/components/myComponents/messages/DirectConversation";
import MessageInput from "@/components/myComponents/messages/MessageInput";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return;
  }

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <DirectConversation id={id} />
      <MessageInput id={id} group={false}/>
    </div>
  );
};

export default page;
