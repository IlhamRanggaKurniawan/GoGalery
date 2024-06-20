import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import ProfileButton from "./ProfileButton";

const ProfileMain = ({ username, userId, content }: { username: string; userId: number; content: number }) => {
  return (
    <div>
      <div className="flex items-center gap-3 py-4 flex-col">
        <Avatar className="h-20 w-20  lg:h-36 lg:w-36 ">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <div className="flex overflow-hidden w-screen max-w-sm items-center justify-center">
          <h2 className="text-lg font-medium truncate">{username}</h2>
        </div>
      </div>
      <ProfileInfo userId={userId} content={content} />
      <div className="flex justify-center my-2 gap-2">
        <ProfileButton userId={userId} />
      </div>
      <ProfileBio />
    </div>
  );
};

export default ProfileMain;
