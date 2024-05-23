import ContentMain from "@/components/myComponents/content/ContentMain";
import ProfileMain from "@/components/myComponents/profile/ProfileMain";
import ProfileNavigation from "@/components/myComponents/profile/ProfileNavigation";
import { Separator } from "@/components/ui/separator";
import { getContentByUsername, IContent } from "@/lib/actions/content";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { username: string } }) => {
  const contents = await getContentByUsername(params.username);

  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">
      <div className="max-w-5xl">
        <ProfileMain username={`${params.username}`} />
        <Separator className="my-2" />
        <div>
          <ProfileNavigation username={`${params.username}`} isTagged={false} />
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-3 gap-[2px] m-1 mt-2">
          {contents ? (
            contents.map((content: IContent) => (
              <Link href={`/${params.username}/${content.id}`} key={content.id}>
                <ContentMain alt={content.caption} url={content.url} />
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
