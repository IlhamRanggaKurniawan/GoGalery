import StraightContentInfinityScroll from "@/components/myComponents/content/StraightContentInfinityScroll";
import HomePageBar from "@/components/myComponents/HomePageBar";
import Content from "@/components/newDesign/content/Content";
import ContentNotFound from "@/components/newDesign/content/ContentNotFound";
import Navbar from "@/components/newDesign/Navbar";
import { getContentByFollowing } from "@/lib/actions/content";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
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

const page = async ({ searchParams }: { searchParams: { contentId: number } }) => {
  let queryContent: any

  if (searchParams.contentId) {
    queryContent = await api.get(`/content/findone/${searchParams.contentId}`, { cache: "no-cache" })
  }

  const contents = await api.get("/content/findall", { cache: "no-cache" })

  return (
    <div >
      <div className=" overflow-y-auto flex flex-col items-center">
        {searchParams.contentId && !queryContent && (
          <ContentNotFound contentId={searchParams.contentId} />
        )}

        {queryContent && (
          <Content caption={queryContent.Caption} username={queryContent.Uploader.Username} contentUrl={queryContent.URL} id={queryContent.ID} key={queryContent.ID} type={queryContent.Type} />
        )}

        {contents.map((content: any) => {
          if (queryContent && content.ID === queryContent.ID) return
          return <Content caption={content.Caption} username={content.Uploader.Username} contentUrl={content.URL} id={content.ID} key={content.ID} type={content.Type} />
        })}
      </div>
    </div>
  );
};

export default page;
