import LoginForm from "@/components/myComponents/form/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse login page",
  keywords:"connect, verse, social media",
  authors: [{name: "Connect Verse team"}],
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
      <LoginForm />
    </>
  );
};

export default page;
