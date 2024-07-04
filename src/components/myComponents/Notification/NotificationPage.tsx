"use client";

import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import { getAllNotification, INotification } from "@/lib/actions/notification";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { data: session } = useSession();

  const getNotification = async () => {
    if (!session) return;

    const { data } = await getAllNotification({ userId: session.user.id });

    if (!data) return;

    setNotifications(data);
  };

  useEffect(() => {
    getNotification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-screen w-screen sm:w-96 p-0">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl">Notification</h1>
        <Link href="/">
          <X />
        </Link>
      </div>
      <Separator className="mb-1" />
      <div className="flex flex-col h-[600px] lg:h-[750px] gap-1 overflow-y-auto px-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            username={notification.trigger.username}
            content={notification.content}
            createdAt={notification.createdAt}
            profilePicture={notification.trigger.profileUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
