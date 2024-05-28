import Image from "next/image";
import React from "react";

const ContentMain = ({ url, alt, preview }: { url: string; alt: string; preview?: boolean }) => {
  return (
    <div>
      {preview ? (
        <Image
          src={url}
          width={1920}
          height={1920}
          alt={alt}
          className="w-full aspect-square border bg-black object-cover"
          loading="lazy"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      ) : (
        <Image
          src={url}
          width={1920}
          height={1920}
          alt={alt}
          className="border"
          loading="lazy"
          layout="responsive"
          objectFit="cover"
          objectPosition="center"
        />
      )}
    </div>
  );
};

export default ContentMain;
