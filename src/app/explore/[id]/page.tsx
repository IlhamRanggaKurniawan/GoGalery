import Content from "@/components/myComponents/content/Content";
import { getChainingContent, getContentById, IContent } from "@/lib/actions/content";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return;
  }

  const content = await getContentById(id);

  if (!content) {
    return;
  }

  const chainingContents = await getChainingContent({id, });

  return (
    <div className="pt-12 mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
      <div className="w-screen h-12 flex items-center fixed top-0 left-0 bg-secondary sm:pl-14 md:pl-16 lg:pl-56 gap-4 pr-6 z-10">
        <Link href="/explore">
          <ChevronLeft size={35} />
        </Link>
        <h1 className="text-lg font-medium">Explore</h1>
      </div>
      <div className="flex flex-col gap-4 items-center">
        {content ? <Content uploader={content.uploader.username} caption={content.caption} url={content.url} /> : <div>no content available</div>}

        {chainingContents ? (
          chainingContents.map((content: IContent) => (
              <Content uploader={content.uploader.username} caption={content.caption} url={content.url} key={content.id}/>
          ))
        ) : (
          <div>halo</div>
        )}
      </div>
    </div>
  );
};

export default page;
