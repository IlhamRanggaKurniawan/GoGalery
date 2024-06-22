import HeadMetaData from "@/components/myComponents/HeadMetaData";
import GroupConversation from "@/components/myComponents/messages/GroupConversation";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <HeadMetaData pathname={`/group/${params.id}`} metaDataDescription="GroupChat conversation page" title="group chat" />
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0">
        <GroupConversation id={+params.id} />
      </div>
    </>
  );
};

export default page;
