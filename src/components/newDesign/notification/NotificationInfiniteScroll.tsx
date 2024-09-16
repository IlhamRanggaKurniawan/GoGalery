"use client"

import React, { useState } from 'react'
import Notification from './Notification';
import apiClient from '@/lib/apiClient';
import { useSession } from '@/lib/hooks/useSession';
import useEffectAfterMount from '@/lib/hooks/useEffectAfterMount';

const NotificationInfiniteScroll = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const { user } = useSession()

  const getNotification = async () => {
    try {
      if (!user) return

      const notifications = await apiClient.get(`/v1/notifications/${user?.id}`, { cache: "no-cache" })

      setNotifications(notifications);

    } catch (error) {
      console.error(error);
    }
  }

  useEffectAfterMount(() => {
    getNotification()
  }, [user])

  return (
    <div className='w-full overflow-y-auto mt-12 flex flex-col gap-1'>
      {notifications && notifications.map((notification) => (
        <Notification username={notification.Trigger.Username} content={notification.Content} profilePicture={notification.Trigger.ProfileUrl} createdAt={notification.CreatedAt} key={notification.ID} />
      ))}
    </div>
  )
}

export default NotificationInfiniteScroll