"use client";

import apiClient from "@/lib/apiClient";
import { useSession } from "@/lib/hooks/useSession";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Avatar from "../Avatar";
import { Button } from "@/components/ui/button";
import AccountPreview from "../AccountPreview";
import EachUtils from "@/lib/EachUtils";

const GroupInfoDialog = ({ children, id, groupProfile }: { children: React.ReactNode; id: number; groupProfile: string }) => {
  const [users, setUsers] = useState<TUserPreview[]>([]);
  const [name, setName] = useState("");

  const { user } = useSession();
  const router = useRouter();

  const handleLeaveGroup = async () => {
    try {
      if (!id || !user) return;

      await apiClient.delete(`/v1/group/member/${id}`)

      router.push("/group");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const groupData = async () => {
      try {
        const group = await apiClient.get(`/v1/group/${id}`, { cache: "no-cache" })

        setUsers(group.Members)
        setName(group.Name)
      } catch (error) {
        console.error(error);
      }
    };

    groupData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

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
          <div className="w-36 h-36">
            <Avatar profilePicture={groupProfile} username={name} />
          </div>
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
          <EachUtils
          of={users}
          render={(user) => (
            <Link href={`/${user.Username}`} className="w-full text-left rounded-md" key={user.Id}>
              <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
            </Link>
          )} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupInfoDialog;
