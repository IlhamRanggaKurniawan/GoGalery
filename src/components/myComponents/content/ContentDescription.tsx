"use client";

import React, { useState, useRef, useEffect } from "react";

const ContentDescription = ({ caption }: { caption: string }) => {
  const [isTruncate, setIsTruncate] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflow = textRef.current.scrollWidth > textRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, [caption]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-sm ${isTruncate ? "truncate" : ""}`}
        style={{ cursor: isOverflowing ? 'pointer' : 'auto' }}
      >
        {caption}
      </p>
      {isOverflowing && (
        <button
          className="text-sm text-gray-400"
          onClick={() => setIsTruncate(!isTruncate)}
        >
          {isTruncate ? "See more..." : "See less..."}
        </button>
      )}
    </div>
  );
};

export default ContentDescription;
