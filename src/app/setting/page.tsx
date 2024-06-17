import SettingBar from "@/components/myComponents/SettingBar";
import React from "react";

const page = () => {
  return (
    <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-4">
        <div className="h-[604px] overflow-y-auto w-screen sm:w-72">
          <h1 className="p-3 font-semibold text-xl text-center">Settings</h1>
          <SettingBar />
        </div>
        <div className="hidden sm:block">tes</div>
    </div>
  );
};

export default page;
