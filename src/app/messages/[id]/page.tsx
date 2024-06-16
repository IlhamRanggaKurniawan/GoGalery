import DirectConversation from "@/components/myComponents/messages/DirectConversation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0 overflow-hidden">
      <DirectConversation id={+params.id} />
    </div>
  );
};

export default page;
