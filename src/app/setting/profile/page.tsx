import UpdateProfileForm from "@/components/myComponents/form/UpdateProfileForm";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit profile | Connect Verse",
  description: "Welcome to the Connect Verse Edit profile page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Edit profile | Connect Verse",
    description: "Welcome to the Connect Verse Edit profile page",
    url: "https://ConnectVerse.com/setting/profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edit profile | Connect Verse",
    description: "Welcome to the Connect Verse Edit profile page",
  },
};

const page = () => {
  return (
    <>
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
