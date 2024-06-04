"use client";

import { Bell, CircleUser, Compass, Home, ImageUp, MessageCircle, Rocket, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import SearchSheet from "./SearchSheet";
import MenuDropDown from "./MenuDropDown";
import { useSession } from "next-auth/react";
import NotificationSheet from "./Notification/NotificationSheet";
import { getAllNotification, INotification } from "@/lib/actions/notification";

const Navbar = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const getNotification = async () => {
    if (session) {
      const response: any = await getAllNotification({ userId: session.user.id });

      setNotifications(response);
    }
  };

  return (
    <div className="h-14 bg-background fixed bottom-0 left-0 w-screen sm:h-full sm:w-14 md:w-16 lg:w-56 z-50 flex flex-col sm:border-r-2 sm:justify-evenly py-4">
      <div className="hidden sm:flex items-center justify-center gap-2 font-bold text-primary">
        <Rocket size={25} />
        <span className="hidden lg:block">ConnectVerse</span>
      </div>
      <div className="flex h-full items-center sm:flex-col lg:items-start lg:ml-2 sm:border-t-0 justify-around sm:justify-normal sm:mt-16 gap-2">
        <Link href="/" title="Home page">
          <div className="flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
            <Home size={25} />
            <span className="hidden lg:inline-block">Home</span>
          </div>
        </Link>
        <SearchSheet side="left">
          <div className="hidden sm:flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg cursor-pointer">
            <Search size={25} />
            <span className="hidden lg:inline-block">Search</span>
          </div>
        </SearchSheet>
        <Link href="/explore" title="Explore page">
          <div className="flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
            <Compass size={25} />
            <span className="hidden lg:inline-block">Explore</span>
          </div>
        </Link>
        <Link href="/upload" title="Upload image">
          <div className="flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
            <ImageUp size={25} />
            <span className="hidden lg:inline-block">Upload</span>
          </div>
        </Link>
        <button className="hidden sm:flex" onClick={getNotification}>
          <NotificationSheet side="left" notifications={notifications}>
            <div className="hidden sm:flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
              <Bell size={25} />
              <span className="hidden lg:inline-block">Notification</span>
            </div>
          </NotificationSheet>
        </button>
        <Link href="/messages" title="Send message">
          <div className="flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
            <MessageCircle size={25} />
            <span className="hidden lg:inline-block">Messages</span>
          </div>
        </Link>
        <Link href={`/${session?.user?.username}`} title="Profile page">
          <div className="flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg">
            <CircleUser size={25} />
            <span className="hidden lg:block">Profile</span>
          </div>
        </Link>
      </div>
      <MenuDropDown />
    </div>
  );
};

export default Navbar;
