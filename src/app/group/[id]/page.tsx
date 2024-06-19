import GroupConversation from "@/components/myComponents/messages/GroupConversation";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0">
      <GroupConversation id={ +params.id}/>      
    </div>
  );
};

export default page;
