"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import DeleteContentDialog from "./DeleteContentDialog";

const ContentHeader = ({ uploader, profilePicture, id }: { uploader: string; profilePicture: string | null; id: number }) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between">
      <Link href={`/${uploader}`} className="flex items-center gap-3">
        <div>
          <Avatar>
            <AvatarImage src={profilePicture ? profilePicture : `/profile-picture.jpg`} alt={uploader} />
            <AvatarFallback>{uploader}</AvatarFallback>
          </Avatar>
        </div>
        <span className="font-semibold text-sm">{uploader}</span>
      </Link>
      {(uploader === session?.user.username || session?.user.role === "admin") && (
        <DeleteContentDialog id={id}>
          <EllipsisVertical size={20} className="cursor-pointer" />
        </DeleteContentDialog>
      )}
    </div>
  );
};

export default ContentHeader;
