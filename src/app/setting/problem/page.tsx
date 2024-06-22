import ReportProblemForm from "@/components/myComponents/form/ReportProblemForm";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import SettingBar from "@/components/myComponents/SettingBar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "report problem | Connect Verse",
  description: "Welcome to the Connect Verse upload report problem page",
  openGraph: {
    title: "report problem | Connect Verse",
    description: "Welcome to the Connect Verse upload report problem page",
    url: "https://ConnectVerse.com/setting/problem",
  },
  twitter: {
    card: "summary_large_image",
    title: "report problem | Connect Verse",
    description: "Welcome to the Connect Verse upload report problem page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/setting/problem" metaDataDescription="report problem page" title="report problem" />
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
