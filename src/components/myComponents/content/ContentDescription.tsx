"use client";

import React, { useState } from "react";

const ContentDescription = ({caption} : {caption : string}) => {
  const [isTruncate, setIsTruncate] = useState(true);
  return (
    <div>
      <p className={`mx-2 text-sm ${isTruncate ? "truncate " : ""}`}>
        {caption}
      </p>
      <button className="mx-2 text-sm text-gray-400" onClick={() => setIsTruncate(!isTruncate)}>
        {isTruncate ? "See more..." : "See less..."}
      </button>
    </div>
  );
};

export default ContentDescription;
