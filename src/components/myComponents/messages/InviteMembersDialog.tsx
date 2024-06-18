import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import AccountPreview from "../AccountPreview";
import { useSession } from "next-auth/react";
import { getMutualFollowers } from "@/lib/actions/user";
import { addMembers, getGroupMembers } from "@/lib/actions/messaging";
import { SheetClose } from "@/components/ui/sheet";

interface IUser {
  id: number;
  username: string;
}

const InviteMembersDialog = ({ children, id }: { children: React.ReactNode; id?: number }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);
  const [groupMembers, setGroupMembers] = useState<IUser[]>([])

  const { data: session } = useSession();

  const getUsers = async () => {
    if (!session) return;

    const users = await getMutualFollowers({ username: search, id: session.user.id });

    if (users) {
      setUsers(users);
    }
  };

  const getMembers = async () => {
    if(!id) return
    const members = await getGroupMembers({id})

    if(members) {
        setGroupMembers(members)
    }
  }

  const handleSelectUser = (user: { id: number; username: string }) => {
    if (selectedUsers.find((prev) => prev.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((prev) => prev.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const addPeople = async () => {
    if (!id) return;

    await addMembers({ groupId: id, members: selectedUsers });

    getMembers()
  };

  useEffect(() => {
    getUsers();
    getMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex justify-between">
          <DialogHeader className=" font-medium">Invite users</DialogHeader>
          <DialogClose className="flex flex-col gap-2">
            <X />
          </DialogClose>
        </div>
        <Separator className=" bg-black" />
        <Input type="text" placeholder="Add members" onChange={(e) => setSearch(e.target.value)} />
        <div className="h-96 overflow-y-auto">
          {users.map((user) => {
            if(groupMembers.some((member) => member.id === user.id)) return
            const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
            return (
              <button className={`w-full text-left rounded-md ${isSelected ? "bg-gray-200" : ""}`} key={user.id} onClick={() => handleSelectUser(user)}>
                <AccountPreview username={user.username} />
              </button>
            );
          })}
        </div>
        {selectedUsers.length !== 0 ? (
          <SheetClose>
            <Button className="w-full" onClick={addPeople}>
              Invite users
            </Button>
          </SheetClose>
        ) : (
          <Button className="w-full" variant={"secondary"} disabled>
            Invite users
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersDialog;
