"use client";

import { Bug, KeyRound, LogOut, Palette, Pin, Trash, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

const SettingBar = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

  return (
    <div className="h-screen overflow-y-auto w-full sm:w-52 lg:w-60 sm:mb-0 sm:border-r-2">
      <h1 className="p-3 font-semibold text-xl text-center ">Settings</h1>
      <div className="px-4 flex flex-col gap-3">
        <Link href="/setting/profile" className="flex gap-2 items-center cursor-pointer">
          <User size={27} />
          <h3>Edit Profile</h3>
        </Link>
        <Link href="/setting/password" className="flex gap-2 items-center cursor-pointer">
          <KeyRound size={27} />
          <h3>Update Password</h3>
        </Link>
        <Link href="/saved" className="flex gap-2 items-center cursor-pointer sm:hidden">
          <Pin size={27} />
          <h3>Saved Content</h3>
        </Link>
        <button className="flex gap-2 items-center cursor-pointer sm:hidden" onClick={() => toggleTheme()}>
          <Palette size={27} />
          <h3>Switch theme</h3>
        </button>
        <Link href="/setting/problem" className="flex gap-2 items-center cursor-pointer">
          <Bug size={27} />
          <h3>Report a problem</h3>
        </Link>
        <button className="flex gap-2 items-center cursor-pointer sm:hidden" onClick={() => signOut()}>
          <LogOut size={27} />
          <span>Log out</span>
        </button>
        <Link href="/setting/delete" className="flex gap-2 items-center cursor-pointer">
          <Trash size={27} color="red" />
          <h3 className="text-red-600">Delete Account</h3>
        </Link>
      </div>
    </div>
  );
};

export default SettingBar;
