import React from "react";
import Image from "next/image";

const ContentMain = ({ url, alt, preview }: { url: string; alt: string; preview?: boolean }) => {
  return (
    <>
      {preview ? (
        <Image src={url} width={1920} height={1920} alt={alt} className="aspect-square border bg-secondary object-cover"/>
      ) : (
        <Image src={url} width={1920} height={1920} alt={alt} className="border bg-secondary w-full"/>
      )}
    </>
  );
};

export default ContentMain;
