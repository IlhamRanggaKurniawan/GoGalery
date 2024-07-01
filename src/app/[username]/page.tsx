import GridContentInfinityScroll from "@/components/myComponents/content/GridContentInfinityScroll";
import ProfileMain from "@/components/myComponents/profile/ProfileMain";
import { Separator } from "@/components/ui/separator";
import { getContentByUsername } from "@/lib/actions/content";
import { getUserProfile } from "@/lib/actions/user";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = ({params} : {params : {username: string}}): Metadata => {
  return {
    title: `${params.username} | Connect Verse`,
    description: `Welcome to ${params.username} profile page`,
    openGraph: {
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} profile page`,
      url: "https://ConnectVerse.com",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} profile page`,
    },
  }
}

const page = async ({ params }: { params: { username: string } }) => {
  const { data, error } = await getUserProfile({username: params.username});

  if (!data || error) {
    return <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">{error}</div>;
  }

  return (
    <>
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">
      <div className="max-w-5xl">
        <ProfileMain username={data.username} userId={data.id} content={data._count.content} bio={data.bio} profilePicture={data.profileUrl}/>
        <Separator className="my-4" />
        <GridContentInfinityScroll contentFuction={getContentByUsername} accountUsername={data.username} href={data.username}/>
      </div>
    </div>
    </>
  );
};

export default page;
