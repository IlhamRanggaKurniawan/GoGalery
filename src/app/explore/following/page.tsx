
import Content from "@/components/newDesign/content/Content";
import api from "@/lib/api";
import { Metadata } from "next";
import React from "react";

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

const page = async () => {

  const contents = await api.get("/content/findall", { cache: "no-cache" })

  return (
    <div >
      <div className=" overflow-y-auto flex flex-col items-center">
        {contents && contents.map((content: any) => (
          <Content caption={content.Caption} username={content.Uploader.Username} contentUrl={content.URL} id={content.ID} key={content.ID} type={content.Type} profilePicture={content.Uploader.ProfileUrl} />
        ))}
      </div>
    </div>
  );
};

export default page;
