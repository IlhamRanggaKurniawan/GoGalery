/* eslint-disable react/no-unescaped-entities */
import DeleteAccountForm from "@/components/myComponents/form/DeleteAccountForm";
import SettingBar from "@/components/myComponents/SettingBar";
import Button from "@/components/newDesign/Button";
import FormField from "@/components/newDesign/FormField";
import Header from "@/components/newDesign/Header";
import { ChevronLeft } from "lucide-react";
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
    <div>
      <Header>
        <div className="flex gap-2 items-center h-14">
          <ChevronLeft size={30} />
          <h2 className="text-lg font-semibold text-red-400">Delete Account</h2>
        </div>
      </Header>
      <form className="mx-4 flex flex-col gap-3">
        <div>
          <label htmlFor="username">enter your username</label>
          <FormField handleChange={() => console.log()} placeholder="username" value="" type="text" id="username" />
        </div>
        <div>
          <label htmlFor="text">type "<i>delete my account</i>" below:</label>
          <FormField handleChange={() => console.log()} placeholder="delete my account" value="" type="text" id="text" />
        </div>
        <Button className="bg-red-500 rounded-2xl">
          <p className="text-white">Delete</p>
        </Button>
      </form>
    </div>
  );
};

export default page;
