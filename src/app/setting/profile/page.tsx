import UpdateProfileForm from "@/components/myComponents/form/UpdateProfileForm";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "edit profile | Connect Verse",
  description: "Welcome to the Connect Verse upload edit profile page",
  openGraph: {
    title: "edit profile | Connect Verse",
    description: "Welcome to the Connect Verse upload edit profile page",
    url: "https://ConnectVerse.com/setting/profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "edit profile | Connect Verse",
    description: "Welcome to the Connect Verse upload edit profile page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/setting/profile" metaDataDescription="edit profile page" title="edit profile" />
      <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
        <div className="hidden sm:block">
          <SettingBar />
        </div>
        <div className="flex-grow">
          <UpdateProfileForm />
        </div>
      </div>
    </>
  );
};

export default page;
