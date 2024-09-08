import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import React, { ReactNode } from 'react'
import Notification from './Notification';

const NotificationSheet = ({ children, notifications }: { children: ReactNode; notifications: any[] }) => {
    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer w-full">
                {children}
            </SheetTrigger>
            <SheetContent side="left" className="h-screen w-screen sm:w-96 p-0">
                <div className="flex items-center justify-between p-4">
                    <SheetHeader>
                        <SheetTitle className="text-xl">Notification</SheetTitle>
                    </SheetHeader>
                    <SheetClose asChild className="cursor-pointer">
                        <X />
                    </SheetClose>
                </div>
                <Separator className="mb-1" />
                <div className='w-full h-full overflow-y-auto flex flex-col gap-1 pb-20'>
                    {notifications.map((notification) => (
                        <Notification key={notification.ID} content={notification.Content} profilePicture={notification.Trigger.ProfileUrl} username={notification.Trigger.Username} createdAt={notification.CreatedAt} />
                    ))}

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NotificationSheet