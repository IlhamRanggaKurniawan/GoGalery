import ContactHeader from "@/components/myComponents/messages/ContactHeader";
import ContactList from "@/components/myComponents/messages/ContactList";
import React from "react";

const page = () => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4 pt-14">
      <ContactHeader group/>
      <div>
        <ContactList group/>
      </div>
    </div>
  );
};

export default page;
