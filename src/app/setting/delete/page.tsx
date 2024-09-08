import DeleteAccountForm from "@/components/newDesign/form/DeleteAccountForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Delete account | Connect Verse",
  description: "Welcome to the Connect Verse Delete account page",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
  openGraph: {
    title: "Delete account | Connect Verse",
    description: "Welcome to the Connect Verse Delete account page",
    url: "https://ConnectVerse.com/setting/Delete",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete account | Connect Verse",
    description: "Welcome to the Connect Verse Delete account page",
  },
};

const page = () => {
  return (
    <DeleteAccountForm />
  );
};

export default page;
