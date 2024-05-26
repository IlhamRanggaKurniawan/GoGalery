import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import ProfileBio from "./ProfileBio";
import ProfileInfo from "./ProfileInfo";
import FollowButton from "../FollowButton";

const ProfileMain = ({ username,userId, follower, following, content }: { username: string, userId: number, follower: number, following : number, content: number }) => {
  
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
      <ProfileInfo follower={follower} following={following} content={content}/>
      <div className="flex justify-center my-2 gap-2">
        <FollowButton userId={userId}/>
        <Button className="py-4 px-8 max-w-24">Message</Button>
      </div>
      <ProfileBio />
    </div>
  );
};

export default ProfileMain;
