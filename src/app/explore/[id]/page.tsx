import Content from "@/components/myComponents/content/Content";
import { getAllContent, IContent } from "@/lib/actions/content";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async() => {
  const contents = await getAllContent()


  return (
    <div className="pt-12 mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <div className="w-screen h-12 flex items-center fixed top-0 left-0 bg-secondary sm:pl-14 md:pl-16 lg:pl-56 gap-4 pr-6 z-10">
        <Link href="/explore">
          <ChevronLeft size={35} />
        </Link>
        <h1 className="text-lg font-medium">Explore</h1>
      </div>
      <div className="flex flex-col gap-4 items-center">
      {contents ? contents.map((content : IContent) => (
          <Content key={content.id} uploader={content.uploader.username} caption={content.caption} url={content.url}/>
        )): (
          <span className="text-red-600 font-semibold ">Something went wrong</span>
        )}
  
      </div>
    </div>
  );
};

export default page;
