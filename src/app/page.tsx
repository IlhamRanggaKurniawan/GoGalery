import Content from "@/components/newDesign/content/Content";
import Header from "@/components/newDesign/Header";
import api from "@/lib/api";
import getSession from "@/lib/serverHooks/getSession";
import { Bell } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

const page = async () => {

  const { user } = await getSession()

  const responses = await api.get(`/v1/contents/${user.id}`, { cache: "no-cache" })

  return (
    <>
      <div className="sm:hidden">
        <Header>
          <div className="h-14 w-full flex justify-between items-center px-4">
            <h2 className="text-xl font-semibold">GoGalery</h2>
            <Link href={"/notifications"}>
              <Bell size={30} />
            </Link>
          </div>
        </Header>
      </div>
      <div className=" overflow-y-auto flex flex-col items-center mt-14 sm:mt-0">
        {responses && responses.map((response: any) => (
          <Content caption={response.content.Caption} username={response.content.Uploader.Username} contentUrl={response.content.URL} id={response.content.ID} key={response.content.ID} type={response.content.Type} profilePicture={response.content.Uploader.ProfileUrl} isLiked={response.Like.isLiked} isSaved={response.Save.isSaved} likeId={response.Like.likeId} saveId={response.Save.saveId} />
        ))}
      </div>
    </>
  );
};

export default page;

