import ContentMain from "@/components/myComponents/content/ContentMain";
import ProfileMain from "@/components/myComponents/profile/ProfileMain";
import ProfileNavigation from "@/components/myComponents/profile/ProfileNavigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { username: string } }) => {
  return (
    <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-2 flex flex-col items-center justify-center">
      <div className="max-w-5xl">
        <ProfileMain username={`${params.username}`} />
        <Separator className="my-2" />
        <div>
          <ProfileNavigation username={`${params.username}`} isTagged={true} />
        </div>
        <Separator className="my-2" />
        <div className="grid grid-cols-3 gap-[2px] m-1 mt-2">
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
          <Link href={`/${params.username}/post`}>
            <ContentMain alt="tes" url="https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/1716358424837145962.jpg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
