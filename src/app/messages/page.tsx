import Contact from "@/components/myComponents/messages/Contact";
import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 pt-14">
      <ContactHeader group={false} />
      <Separator />
      <Link href="/messages/group" className="flex p-4 gap-3 bg-primary-foreground">
        <Users size={30} />
        <h3 className="text-xl">Group</h3>
      </Link>
      <Separator />
      <div>
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
        <Contact id="123" />
      </div>
    </div>
  );
};

export default page;
