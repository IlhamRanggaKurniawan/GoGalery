/* eslint-disable react/no-unescaped-entities */
import DeleteAccountForm from "@/components/myComponents/form/DeleteAccountForm";
import SettingBar from "@/components/myComponents/SettingBar";
import React from "react";

const page = () => {
  return (
    <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
      <div className="hidden sm:block">
        <SettingBar />
      </div>
      <div className="flex-grow">
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default page;
