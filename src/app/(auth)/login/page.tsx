import LoginForm from "@/components/myComponents/form/LoginForm";
import HeadMetaData from "@/components/myComponents/HeadMetaData";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse login page",
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse login page",
    url: "https://ConnectVerse.com/login",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse login page",
  },
};

const page = () => {
  return (
    <>
      <HeadMetaData pathname="/login" metaDataDescription="login page for connect verse web app" />
      <LoginForm />
    </>
  );
};

export default page;
