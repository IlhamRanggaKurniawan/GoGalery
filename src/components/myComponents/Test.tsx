"use client";

import dynamic from "next/dynamic";
import React from "react";
import ContentSkeleton from "./content/ContentSkeleton";
import { Button } from "../ui/button";
import { likeContent } from "@/lib/actions/like";

const Content = dynamic(() => import("./content/ContentMain"), {
  loading: () => <ContentSkeleton />
})

const Test = () => {

  return (
    <div>
        <Content url={"https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/17168885011432379587.png"} alt={"tes"}/>
        <Button onClick={() => likeContent({userId: 16, contentId: 103})}>Like</Button>
    </div>
  );
};

export default Test;
