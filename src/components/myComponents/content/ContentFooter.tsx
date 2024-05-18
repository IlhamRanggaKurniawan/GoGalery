"use client";

import { ExternalLink, MessageCircle, Pin, Star } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "next-themes";

const ContentFooter = () => {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  return (
    <div>
      <div className="flex justify-between m-2">
        <div className="flex gap-3">
          <button onClick={() => setIsLiked(!isLiked)}>{isLiked ? <Star fill="#FFF200" color="#FFF200" /> : <Star />}</button>
          <button>
            <MessageCircle />
          </button>
          <button>
            <ExternalLink />
          </button>
        </div>
        {theme === "light" ? (
          <div>
            <button onClick={() => setIsPinned(!isPinned)}>{isPinned ? <Pin fill="black" /> : <Pin />}</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setIsPinned(!isPinned)}>{isPinned ? <Pin fill="white" /> : <Pin />}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFooter;
