import React from "react";
import Avatar from "./Avatar";

const AccountPreview = ({ username, profilePicture }: { username: string; profilePicture: string | null }) => {
    return (
        <div className="flex items-center sm:hover:bg-secondary rounded-md p-1 px-2 gap-2 w-full cursor-pointer">
            <div className="w-10 h-10">
                <Avatar profilePicture={profilePicture} username={username} />
            </div>
            <div className="overflow-hidden">
                <h3 className="truncate">{username}</h3>
                <h4 className="text-sm text-slate-500 truncate">{username}</h4>
            </div>
        </div>
    );
};

export default AccountPreview;