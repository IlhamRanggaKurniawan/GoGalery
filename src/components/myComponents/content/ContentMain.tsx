import Image from "next/image";
import React from "react";

const ContentMain = ({url, alt}: {url: string, alt: string}) => {
  return (
      <Image 
        src={url}
        width={1080}
        height={1080}
        alt={alt}
        className="w-full aspect-square border bg-black object-contain"
      />
  );
};

export default ContentMain;
