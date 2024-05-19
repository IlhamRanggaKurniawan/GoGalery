"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, MessageCircleCode, Palette, Pin, Settings, Settings2 } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

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
          <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer">
            <Settings size={20} />
            <span className="font-medium">Setting</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer" onClick={() => toggleTheme()}>
            <Palette size={20} />
            <span className="font-medium">Switch theme</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer">
            <Pin size={20} />
            <span className="font-medium">Saved</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-3 p-3 cursor-pointer"> 
            <MessageCircleCode size={20} />
            <span className="font-medium">Give us feedback</span>
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
