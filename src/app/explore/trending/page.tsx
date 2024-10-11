import Content from "@/components/newDesign/content/Content";
import ContentNotFound from "@/components/newDesign/content/ContentNotFound";
import StraightInfiniteScroll from "@/components/newDesign/content/StraightInfiniteScroll";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
import { Metadata } from "next";
import React from "react";

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

const page = async ({ searchParams }: { searchParams: { contentId: number } }) => {
  let queryContent: any

  const { user } = await getSession()

  if (searchParams.contentId) {
    queryContent = await api.get(`/v1/content/${searchParams.contentId}?userId=${user.id}`, { cache: "no-cache" })
  }

  return (
    <div >
      <div>
        {searchParams.contentId && !queryContent && (
          <ContentNotFound contentId={searchParams.contentId} />
        )}

        {queryContent && (
          <Content caption={queryContent.content.Caption} username={queryContent.content.Uploader.Username} contentUrl={queryContent.content.URL} id={queryContent.content.ID} key={queryContent.content.ID} type={queryContent.content.Type} profilePicture={queryContent.content.Uploader.ProfileUrl} isLiked={queryContent.Like.isLiked} isSaved={queryContent.Save.isSaved} likeId={queryContent.Like.likeId} saveId={queryContent.Save.saveId} />
        )}
        <StraightInfiniteScroll />
      </div>
    </div>
  );
};

export default page;
