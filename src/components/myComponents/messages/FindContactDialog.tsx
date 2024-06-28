"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import AccountPreview from "../AccountPreview";
import { checkExistingDM, createDM } from "@/lib/actions/messaging";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserWefollow, IUserPreview } from "@/lib/actions/user";
import { useDebounce } from "use-debounce";

const FindContactDialog = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const [userWeFollow, setUserWeFollow] = useState<IUserPreview[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: session } = useSession();
  const router = useRouter();

  const followingUsers = async () => {
    if (!session || search.length === 0) return;

    const { data } = await getUserWefollow({ id: session.user.id, username: search });

    if (!data) return;

    setUsers(data.randomUsers);
    setUserWeFollow(data.users);
  };

  const handleClick = async ({ id }: { id: number }) => {
    if (!session) return;

    const { data } = await checkExistingDM({ participantIDs: [id, session.user.id] });

    if (data) {
      return router.push(`/messages/${data.id}`);
    }

    const { data: res } = await createDM({ participants: [{ id }, { id: session.user.id }] });

    return router.push(`/messages/${res?.id}`);
  };

  useEffect(() => {
    followingUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[460px] flex flex-col gap-2">
        <div className="flex justify-between">
          <DialogHeader className=" font-medium">Send a new message</DialogHeader>
          <DialogClose className="flex flex-col gap-2">
            <X />
          </DialogClose>
        </div>
        <Separator className=" bg-black" />
        <Input type="text" placeholder="Search.." onChange={(e) => setSearch(e.target.value)} />
        <div className="h-[380px] overflow-y-auto">
          {search.length === 0 && userWeFollow.length === 0 && users.length === 0 && <div className="text-center">Search for user</div>}
          {userWeFollow?.map((user) => (
            <button onClick={() => handleClick({ id: user.id })} className="w-full text-left " key={user.id}>
              <AccountPreview username={user.username} profilePicture={user.profileUrl}/>
            </button>
          ))}
          {users?.map((user) => (
            <button onClick={() => handleClick({ id: user.id })} className="w-full text-left" key={user.id}>
              <AccountPreview username={user.username} profilePicture={user.profileUrl}/>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FindContactDialog;
