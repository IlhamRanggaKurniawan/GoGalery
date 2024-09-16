import React from "react";
import LoginForm from "@/components/newDesign/form/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Verse",
  description: "Welcome to the Connect Verse homepage.",
  keywords: "connect, verse, social media",
  authors: [{ name: "Connect Verse team" }],
  openGraph: {
    title: "Connect Verse",
    description: "Welcome to the Connect Verse homepage.",
    url: "https://ConnectVerse.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect Verse",
    description: "Welcome to the Connect Verse homepage.",
    images: ["https://example.com/image.jpg"],
  },
};

const page = () => {
  return (
    <LoginForm />
  )
};

export default page;

