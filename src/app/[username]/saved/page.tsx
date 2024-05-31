import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import { getSavedContentByUsername } from "@/lib/actions/content";
import React from "react";

const page = ({params} : {params: {username: string}}) => {

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 flex items-center justify-center">
      <div className="max-w-[1000px] mt-12 sm:mt-0">
        <GridContentInfinityScroll contentFuction={getSavedContentByUsername} parameter={{ username: params.username }} />
      </div>
    </div>
  );
};

export default page;
