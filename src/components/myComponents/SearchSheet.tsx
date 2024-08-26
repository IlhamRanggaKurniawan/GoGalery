"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode, useEffect, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import AccountPreview from "./AccountPreview";
import { ScrollArea } from "../ui/scroll-area";
import { findUser, IUserPreview } from "@/lib/actions/user";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import apiClient from "@/lib/apiClient";

const SearchSheet = ({ children, side }: { children: ReactNode; side: "left" | "bottom" | "top" | "right" }) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    try {
      if (search.length === 0) return;

      const users = await apiClient.get(`/user/findall/${search}`, { cache: "no-cache" });

      console.log(users)

      setUsers(users);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Sheet>
      <SheetTrigger asChild aria-label="search">{children}</SheetTrigger>
      <SheetContent side={side} className="h-screen w-screen sm:w-96">
        <div className="flex items-center justify-between">
          <SheetHeader>
            <SheetTitle className="text-xl">Search</SheetTitle>
          </SheetHeader>
          <SheetClose asChild className="cursor-pointer">
            <X />
          </SheetClose>
        </div>
        <Input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />

        <Separator className="my-1" />
        <ScrollArea className="h-full pb-[70px] flex flex-col gap-2 pr-2">
          {users && users.length > 0 ? (
            users.map((user) => (
              <SheetClose asChild key={user.Username}>
                <Link href={`/profile/${user.Username}`} className="flex items-center cursor-pointer gap-3 w-full">
                  <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
                </Link>
              </SheetClose>
            ))
          ) : (
            <div className="text-center">Search for user</div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
