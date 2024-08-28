import Content from "@/components/newDesign/content/Content";
import api from "@/lib/api";
import React from "react";

const page = async () => {
  const contents = await api.get("/content/findall", { cache: "no-cache" })

  return (
    <div >
      <div className=" overflow-y-auto flex flex-col items-center">
        {contents && contents.map((content: any) => (
          <Content caption={content.Caption as string} username={content.Uploader.Username} contentUrl={content.URL} id={content.ID} key={content.ID} type={content.Type} profilePicture={content.Uploader.ProfileUrl}/>
        ))}
      </div>
    </div>
  );
};

export default page;

