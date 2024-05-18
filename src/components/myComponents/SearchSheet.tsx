/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import AccountPreview from "./AccountPreview";
import { ScrollArea } from "../ui/scroll-area";

const SearchSheet = ({ children }: { children: ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"bottom"} className="h-screen w-screen sm:w-96">
        <div className="flex items-center justify-between">
          <SheetHeader>
            <SheetTitle className="text-xl">Search</SheetTitle>
          </SheetHeader>
          <SheetClose asChild className="cursor-pointer">
            <X />
          </SheetClose>
        </div>
        <form className="my-2">
          <Input type="text" placeholder="Search" />
        </form>
        <Separator className="my-1" />
        <ScrollArea className="h-full pb-[70px] flex flex-col gap-2 pr-2">
          <AccountPreview username="ilham_rku" />
          <AccountPreview username="john_doe" />
          <AccountPreview username="jane_smith" />
          <AccountPreview username="susan_jones" />
          <AccountPreview username="michael_williams" />
          <AccountPreview username="emily_taylor" />
          <AccountPreview username="david_brown" />
          <AccountPreview username="sophia_anderson" />
          <AccountPreview username="william_thomas" />
          <AccountPreview username="olivia_jackson" />
          <AccountPreview username="james_martin" />
          <AccountPreview username="alexander_white" />
          <AccountPreview username="isabella_hall" />
          <AccountPreview username="matthew_miller" />
          <AccountPreview username="ava_thompson" />
          <AccountPreview username="ethan_garcia" />
          <AccountPreview username="mia_martinez" />
          <AccountPreview username="daniel_rodriguez" />
          <AccountPreview username="charlotte_lee" />
          <AccountPreview username="noah_gonzalez" />
          <AccountPreview username="amelia_hernandez" />
          <AccountPreview username="logan_nelson" />
          <AccountPreview username="harper_wright" />
          <AccountPreview username="mason_adams" />
          <AccountPreview username="evelyn_scott" />
          <AccountPreview username="logan_green" />
          <AccountPreview username="abigail_baker" />
          <AccountPreview username="lucas_hill" />
          <AccountPreview username="victoria_carter" />
          <AccountPreview username="benjamin_murphy" />
          <AccountPreview username="avery_torres" />
          <AccountPreview username="grace_rogers" />
          <AccountPreview username="samuel_peterson" />
          <AccountPreview username="aubrey_flores" />
          <AccountPreview username="leah_morris" />
          <AccountPreview username="henry_nguyen" />
          <AccountPreview username="zoey_kim" />
          <AccountPreview username="wyatt_james" />
          <AccountPreview username="nora_king" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSheet;
