"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import AccountPreview from "../AccountPreview";
import { getGroupData, leaveGroup } from "@/lib/actions/messaging";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUserPreview } from "@/lib/actions/user";

const GroupInfoDialog = ({ children, id, groupProfile }: { children: React.ReactNode; id?: number; groupProfile?: string }) => {
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const [name, setName] = useState("");

  const { data: session } = useSession();
  const router = useRouter();

  const groupData = async () => {
    if (!id) return;

    const { data } = await getGroupData({ groupChatId: id });

    if (!data) return;

    setUsers(data.member);
    setName(data.name);
  };

  const handleLeaveGroup = async () => {
    if (!id || !session) return;

    await leaveGroup({ groupId: id, userId: session.user.id });

    groupData();
    router.push("/group");
  };

  useEffect(() => {
    groupData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex justify-between">
          <DialogHeader className=" font-medium">Group Info</DialogHeader>
          <DialogClose className="flex flex-col gap-2">
            <X />
          </DialogClose>
        </div>
        <Separator className=" bg-black" />
        <div className="flex flex-col items-center justify-center gap-1">
          <Avatar className="h-20 w-20  lg:h-36 lg:w-36 ">
            <AvatarImage src={groupProfile ? groupProfile : `/profile-picture.jpg`} alt="@shadcn" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
        <DialogClose className="flex justify-center">
          <Button variant={"destructive"} onClick={handleLeaveGroup}>
            Leave Group
          </Button>
        </DialogClose>
        <div className="px-2">
          <p className="font-medium">Group members:</p>
        </div>
        <div className="max-h-96">
          {users?.map((user) => (
            <Link href={`/${user.username}`} className="w-full text-left rounded-md" key={user.id}>
              <AccountPreview username={user.username} profilePicture={user.profileUrl}/>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInfoDialog;
