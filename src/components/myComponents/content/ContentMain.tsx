import Image from "next/image";
import React from "react";

const ContentMain = () => {
  return (
    <div className="w-full aspect-square">
      <Image 
        src="https://github.com/shadcn.png" 
        width={800}
        height={800}
        alt="content"
      />
    </div>
  );
};

export default ContentMain;
