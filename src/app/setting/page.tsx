import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Setting | Connect Verse",
  description: "Welcome to the Connect Verse upload Setting page",
  openGraph: {
    title: "Setting | Connect Verse",
    description: "Welcome to the Connect Verse upload Setting page",
    url: "https://ConnectVerse.com/setting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Setting | Connect Verse",
    description: "Welcome to the Connect Verse upload Setting page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/setting" metaDataDescription="setting page" title="setting" />
      <div className="sm:pl-14 md:pl-16 lg:pl-56 flex sm:mb-0">
        <SettingBar />
      </div>
    </>
  );
};

export default page;
