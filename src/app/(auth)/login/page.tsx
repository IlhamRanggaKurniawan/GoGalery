import React from "react";
import LoginForm from "@/components/newDesign/form/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoGalery",
  description: "Welcome to the GoGalery homepage.",
  keywords: "Go, Galery, social media",
  authors: [{ name: "GoGalery team" }],
  openGraph: {
    title: "GoGalery",
    description: "Welcome to the GoGalery homepage.",
    url: "https://gogalery.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoGalery",
    description: "Welcome to the GoGalery homepage.",
    images: ["https://example.com/image.jpg"],
  },
};

const page = () => {
  return (
    <LoginForm />
  )
};

export default page;

