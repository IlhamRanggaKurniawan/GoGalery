import Content from "@/components/newDesign/content/Content";
import api from "@/lib/api";
import React from "react";

const page = async () => {
  const contents = await api.get("/content/findall", { cache: "force-cache" })

  console.log(contents)

  return (
    <div >
      <div className=" overflow-y-auto flex flex-col items-center">
        {contents && contents.map((content: any) => (


          content.Type === "image" ? (
            <Content caption={content.Caption as string} username={content.Uploader.Username} contentUrl={content.URL} id={content.ID} key={content.ID} />
          ) : (
            <video width="600" key={content.ID}>
              <source src={content.URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ))}
      </div>
    </div>
  );
};

export default page;

