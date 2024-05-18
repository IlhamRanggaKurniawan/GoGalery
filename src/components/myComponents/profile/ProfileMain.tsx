import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ProfileBio from "./ProfileBio";

const ProfileMain = ({ username }: { username: string }) => {
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
      <div className="flex justify-between items-center px-5 my-2">
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>post</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>follower</span>
        </div>
        <Separator orientation="vertical" className="h-12" />
        <div className="flex flex-col items-center w-[30%]">
          <h4>911</h4>
          <span>following</span>
        </div>
      </div>
      <div className="flex justify-center my-2 gap-2">
        <Button className="py-4 px-8 max-w-24">Follow</Button>
        <Button className="py-4 px-8 max-w-24">Message</Button>
      </div>
      <ProfileBio />
    </div>
  );
};

export default ProfileMain;
