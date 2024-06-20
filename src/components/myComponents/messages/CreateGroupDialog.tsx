"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getMutualFollowers } from "@/lib/actions/user";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import AccountPreview from "../AccountPreview";
import { createGroup } from "@/lib/actions/messaging";

interface IUser {
  id: number;
  username: string;
}

const CreateGroupDialog = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data: session } = useSession();
  const router = useRouter();

  const getUsers = async () => {
    if (!session) return;

    const { data } = await getMutualFollowers({ username: search, id: session.user.id });

    setUsers(data);
  };

  const handleSelectUser = (user: { id: number; username: string }) => {
    if (selectedUsers.find((prev) => prev.id === user.id)) {
      return setSelectedUsers(selectedUsers.filter((prev) => prev.id !== user.id));
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleCreateGroup = async () => {
    if (!session) return;
    const { data } = await createGroup({ name, member: [...selectedUsers, { id: session.user.id }] });

    router.push(`/group/${data?.id}`);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex justify-between">
          <DialogHeader className=" font-medium">Create a group</DialogHeader>
          <DialogClose className="flex flex-col gap-2">
            <X />
          </DialogClose>
        </div>
        <Input type="text" placeholder="Group name" onChange={(e) => setName(e.target.value)} />
        <Separator className=" bg-black" />
        <Input type="text" placeholder="Add members" onChange={(e) => setSearch(e.target.value)} />
        <div className="h-96">
          {users.map((user) => {
            const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
            return (
              <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.id} onClick={() => handleSelectUser(user)}>
                <AccountPreview username={user.username} />
              </button>
            );
          })}
        </div>
        {selectedUsers.length === 0 ? (
          <Button className="w-full" variant={"secondary"} disabled>
            Create Group
          </Button>
        ) : (
          <Button className="w-full" onClick={handleCreateGroup}>
            Create Group
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
