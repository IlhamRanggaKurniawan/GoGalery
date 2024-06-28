import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileButton from "./ProfileButton";

const ProfileMain = ({ username, userId, content, profilePicture, bio }: { username: string; userId: number; content: number; profilePicture: string | null; bio: string | null }) => {
  return (
    <div>
      <div className="flex items-center gap-3 py-4 flex-col">
        <Avatar className="h-20 w-20  lg:h-36 lg:w-36 ">
          <AvatarImage src={profilePicture ? profilePicture : `/profile-picture.jpg`} alt="@shadcn" />
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
      <p className="text-sm px-2 whitespace-pre-line text-center">{bio}</p>
    </div>
  );
};

export default ProfileMain;
