"use client";

import dynamic from "next/dynamic";
import React from "react";
import ContentSkeleton from "./content/ContentSkeleton";
import { Button } from "../ui/button";
import { getAllNotification } from "@/lib/actions/notification";
import { createDM, createGroup } from "@/lib/actions/messaging";

const Content = dynamic(() => import("./content/ContentMain"), {
  loading: () => <ContentSkeleton />
})

const Test = () => {

  return (
    <div>
        <Content url={"https://gsjjcfotrvkfpibhnnji.supabase.co/storage/v1/object/public/Connect%20Verse/Content/17168885011432379587.png"} alt={"tes"}/>
        <Button onClick={() => createDM({participants: [{id: 14}, {id: 16}]})}>Like</Button>
    </div>
  );
};

export default Test;
