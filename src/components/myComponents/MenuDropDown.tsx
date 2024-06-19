"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, MessageCircleCode, Palette, Pin, Settings, Settings2 } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import Link from "next/link";

const MenuDropDown = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="hidden sm:flex items-center gap-2 p-2 lg:w-52 lg:hover:bg-primary lg:hover:text-background rounded-lg justify-center lg:justify-normal m-2">
          <Settings2 size={25} />
          <span className="hidden lg:block">More</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 ml-2" side="top">
        <DropdownMenuGroup className="flex flex-col gap-1">
          <DropdownMenuItem className="cursor-pointer p-0">
            <Link href="/setting" className="flex gap-3 w-full p-3">
              <Settings size={20} />
              <span className="font-medium">Setting</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer" onClick={() => toggleTheme()}>
            <Palette size={20} />
            <span className="font-medium">Switch theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer p-0">
            <Link href="/saved" className="flex gap-3 w-full p-3">
              <Pin size={20} />
              <span className="font-medium">Saved</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className=" p-0 cursor-pointer">
            <Link href="/setting/problem" className="flex gap-3 w-full p-3">
              <MessageCircleCode size={20} />
              <span className="font-medium">Give us feedback</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer" onClick={() => signOut()}>
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropDown;
