import ReportProblemForm from "@/components/myComponents/form/ReportProblemForm";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Report problem | Connect Verse",
  description: "Welcome to the Connect Verse Report problem page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
  openGraph: {
    title: "Report problem | Connect Verse",
    description: "Welcome to the Connect Verse Report problem page",
    url: "https://ConnectVerse.com/setting/problem",
  },
  twitter: {
    card: "summary_large_image",
    title: "Report problem | Connect Verse",
    description: "Welcome to the Connect Verse Report problem page",
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
          <ReportProblemForm />
        </div>
      </div>
    </>
  );
};

export default page;
