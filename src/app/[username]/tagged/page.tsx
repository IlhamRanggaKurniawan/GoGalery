import ContentMain from "@/components/myComponents/content/ContentMain";
import ProfileMain from "@/components/myComponents/profile/ProfileMain";
import { getUserProfile } from "@/lib/actions/user";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const generateMetadata = ({params} : {params : {username: string}}): Metadata => {
  return {
    title: `${params.username} | Connect Verse`,
    description: `Welcome to ${params.username} Post page`,
    keywords:"connect, verse, social media",
    authors: [{name: "Connect Verse team"}],
    openGraph: {
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} Post page`,
      url: "https://ConnectVerse.com",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.username} | Connect Verse`,
      description: `Welcome to ${params.username} Post page`,
    },
  }
}

const page = async ({ params }: { params: { username: string } }) => {

  const {data, error} = await getUserProfile({username: params.username});

  if(!data || error) {
    return (
      <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">{error}</div>
    )
  }

  const contents = data.content

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">
      <div className="max-w-5xl">
        <ProfileMain username={`${data.username}`} userId={data.id} content={data._count.content} profilePicture={data.profileUrl} bio={data.bio}/>
        <div className="grid grid-cols-3 gap-[2px] m-1 mt-2">
          {contents ? (
            contents.map((content) => (
              <Link href={`/${data.username}/${content.id}`} key={content.id}>
                <ContentMain alt={content.caption} url={content.url} preview={true}/>
              </Link>
            ))
          ) : (
            <span className="text-red-600 font-semibold ">Something went wrong</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
