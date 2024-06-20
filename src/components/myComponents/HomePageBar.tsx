"use client";

import React, { useEffect, useState } from "react";
import NotificationSheet from "./Notification/NotificationSheet";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { checkNotification, getAllNotification, INotification } from "@/lib/actions/notification";

const HomePageBar = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isNotification, setIsNotification] = useState<boolean>(false);

  const getNotification = async () => {
    if (!session) return;

    const { data } = await getAllNotification({ userId: session.user.id });

    setNotifications(data);
  };

  const checkIsNotification = async () => {
    if (!session) return;
    
    const { status } = await checkNotification({ userId: session.user.id });

    setIsNotification(status);
  };

  useEffect(() => {
    checkIsNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="h-12 fixed top-0 left-0 w-full flex sm:hidden bg-background rounded-b-lg z-50">
      <button
        onClick={() => {
          getNotification();
          setIsNotification(false);
        }}
        className="w-full"
      >
        <NotificationSheet side="bottom" notifications={notifications}>
          <div className="flex items-center gap-2 p-2 px-4 w-full rounded-lg justify-between">
            <div>
              <h1 className="text-lg font-semibold">Connect Verse</h1>
            </div>
            <div className="relative">
              <Bell size={25} />
              {isNotification && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600" />}
            </div>
          </div>
        </NotificationSheet>
      </button>
    </div>
  );
};

export default HomePageBar;
