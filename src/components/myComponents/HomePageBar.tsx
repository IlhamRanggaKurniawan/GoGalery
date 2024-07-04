"use client";

import React, { useEffect, useState } from "react";
import NotificationSheet from "./Notification/NotificationSheet";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { checkNotification } from "@/lib/actions/notification";
import Link from "next/link";

const HomePageBar = () => {
  const { data: session } = useSession();
  const [isNotification, setIsNotification] = useState<boolean>(false);

  const checkIsNotification = async () => {
    try {
      if (!session) return;

      const { status } = await checkNotification({ userId: session.user.id });

      setIsNotification(status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="h-12 fixed top-0 left-0 w-full flex sm:hidden bg-background rounded-b-lg z-50" aria-label="home page bar">
      <button onClick={() => setIsNotification(false)} className="w-full">
        <div className="flex items-center gap-2 p-2 px-4 w-full rounded-lg justify-between">
          <div>
            <h1 className="text-lg font-semibold">Connect Verse</h1>
          </div>
          <Link className="relative" href="/notifications">
            <Bell size={25} />
            {isNotification && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600" />}
          </Link>
        </div>
      </button>
    </div>
  );
};

export default HomePageBar;
