import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

const ContentHeader = ({uploader} : {uploader: string}) => {
  return (
    <div className="flex items-center gap-3">
      <Link href={`/${uploader}`} className="flex items-center gap-3">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt={uploader} />
            <AvatarFallback>{uploader}</AvatarFallback>
          </Avatar>
        </div>
        <span className="font-semibold text-sm">{uploader}</span>
      </Link>
    </div>
  );
};

export default ContentHeader;
