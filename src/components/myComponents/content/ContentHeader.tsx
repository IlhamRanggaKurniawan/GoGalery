import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

const ContentHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href="/ilham_rku" className="flex items-center gap-3">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>ilham</AvatarFallback>
          </Avatar>
        </div>
        <span className="font-semibold text-sm">Ilham Rangga</span>
      </Link>
    </div>
  );
};

export default ContentHeader;
