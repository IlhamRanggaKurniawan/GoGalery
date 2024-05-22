import Image from "next/image";
import React from "react";

const ContentMain = ({url, alt}: {url: string, alt: string}) => {
  return (
    <div className="w-full aspect-square border border-slate-300 bg-black flex items-center">
      <Image 
        src={url}
        width={800}
        height={800}
        alt={alt}
      />
    </div>
  );
};

export default ContentMain;
