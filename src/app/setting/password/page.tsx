import ChangePasswordForm from "@/components/myComponents/form/ChangePasswordForm";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "change password | Connect Verse",
  description: "Welcome to the Connect Verse upload change password page",
  openGraph: {
    title: "change password | Connect Verse",
    description: "Welcome to the Connect Verse upload change password page",
    url: "https://ConnectVerse.com/setting/password",
  },
  twitter: {
    card: "summary_large_image",
    title: "change password | Connect Verse",
    description: "Welcome to the Connect Verse upload change password page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/setting/password" metaDataDescription="change password page" title="change password" />
      <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
        <div className="hidden sm:block">
          <SettingBar />
        </div>
        <div className="flex-grow">
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default page;
