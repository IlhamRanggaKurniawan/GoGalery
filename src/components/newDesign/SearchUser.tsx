"use client";

import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Separator } from "../ui/separator";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { Input } from "../ui/input";
import AccountPreview from "./AccountPreview";

const SearchUser = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<TUserPreview[]>([]);
  const [debouncedSearch] = useDebounce(search, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    try {
      if (search.length === 0) return;

      const data = await apiClient.get(`/v1/users/${search}`, { cache: "no-cache" });

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <>
      <Input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <Separator className="my-1" />
      <div className="overflow-y-auto h-[550px]">
        {users.length > 0 ? (
          users.map((user) => (
            <Link href={`/profile/${user.Username}`} className="flex items-center cursor-pointer gap-3 w-full" key={user.Username}>
              <AccountPreview username={user.Username} profilePicture={user.ProfileUrl} />
              <p>{user.ProfileUrl}</p>
            </Link>
          ))
        ) : (
          <div className="text-center">Search for user</div>
        )}
      </div>
    </>
  );
};

export default SearchUser;
