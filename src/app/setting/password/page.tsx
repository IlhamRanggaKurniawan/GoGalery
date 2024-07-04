import ChangePasswordForm from "@/components/myComponents/form/ChangePasswordForm";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Change password | Connect Verse",
  description: "Welcome to the Connect Verse Change password page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Change password | Connect Verse",
    description: "Welcome to the Connect Verse Change password page",
    url: "https://ConnectVerse.com/setting/password",
  },
  twitter: {
    card: "summary_large_image",
    title: "Change password | Connect Verse",
    description: "Welcome to the Connect Verse Change password page",
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
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

export default page;
