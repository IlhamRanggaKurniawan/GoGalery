import RegisterForm from "@/components/myComponents/form/RegisterForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse register page",
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse register page",
    url: "https://ConnectVerse.com/register",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse register page",
  },
};

const page = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default page;
