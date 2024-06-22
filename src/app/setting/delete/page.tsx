/* eslint-disable react/no-unescaped-entities */
import DeleteAccountForm from "@/components/myComponents/form/DeleteAccountForm";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "delete account | Connect Verse",
  description: "Welcome to the Connect Verse upload delete account page",
  openGraph: {
    title: "delete account | Connect Verse",
    description: "Welcome to the Connect Verse upload delete account page",
    url: "https://ConnectVerse.com/setting/delete",
  },
  twitter: {
    card: "summary_large_image",
    title: "delete account | Connect Verse",
    description: "Welcome to the Connect Verse upload delete account page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/setting/delete" metaDataDescription="delete account page" title="delete account" />
      <div className="mb-14 sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
        <div className="hidden sm:block">
          <SettingBar />
        </div>
        <div className="flex-grow">
          <DeleteAccountForm />
        </div>
      </div>
    </>
  );
};

export default page;
