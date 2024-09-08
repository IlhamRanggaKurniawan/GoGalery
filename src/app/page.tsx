import Content from "@/components/newDesign/content/Content";
import Header from "@/components/newDesign/Header";
import api from "@/lib/api";
import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const contents = await api.get("/content/findall", { cache: "no-cache" })

  return (
    <>
      <div className="sm:hidden">
        <Header>
          <div className="h-14 w-full flex justify-between items-center px-4">
            <h2 className="text-xl font-semibold">Connect Verse</h2>
            <Link href={"/notifications"}>
              <Bell size={30} />
            </Link>
          </div>
        </Header>
      </div>
      <div className=" overflow-y-auto flex flex-col items-center mt-14 sm:mt-0">
        {contents && contents.map((content: any) => (
          <Content caption={content.Caption as string} username={content.Uploader.Username} contentUrl={content.URL} id={content.ID} key={content.ID} type={content.Type} profilePicture={content.Uploader.ProfileUrl} />
        ))}
      </div>
    </>
  );
};

export default page;

