"use client";

import { isSaved, saveContent, unsaveContent } from "@/lib/actions/save";
import { useLikeStore } from "@/lib/store/likeStore";
import { ExternalLink, MessageCircle, Pin, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const ContentFooter = ({ contentId }: { contentId: number }) => {
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const { data: session } = useSession();

  const { checkLike, like, unlike } = useLikeStore();

  const checkIsLiked = async () => {
    if (session) {
      const res = await checkLike({ userId: session.user.id, contentId });
      setIsLike(res);
    }
  };

  const checkIsSave = async () => {
    if(session) {
      const res = await isSaved({userId: session.user.id, contentId })
      setIsSave(res.status)
    }
  }

  useEffect(() => {
    checkIsLiked()
    checkIsSave()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const debouncedLike = useDebouncedCallback(async () => {
    if (!session) {
      return;
    }

    if (!isLike) {
      setIsLike(true)
      return await like({ userId: session.user.id, contentId });
    } 
    setIsLike(false)
    return await unlike({ userId: session.user.id, contentId });
  }, 300);

  const debouncedSave = useDebouncedCallback(async () => {
    if (!session) {
      return;
    }

    if (!isSave) {
      setIsSave(true)
      return await saveContent({ userId: session.user.id, contentId });
    } 
    setIsSave(false)
    return await unsaveContent({ userId: session.user.id, contentId });
  }, 300);

  return (
    <div>
      <div className="flex justify-between m-2">
        <div className="flex gap-3">
          <button onClick={() => debouncedLike()}>{isLike ? <Star fill="#FFF200" color="#FFF200" /> : <Star />}</button>
          <button>
            <MessageCircle />
          </button>
          <button>
            <ExternalLink />
          </button>
        </div>
        <div>
          <button onClick={() => debouncedSave()}>{isSave ? <Pin fill="bg-primary" /> : <Pin />}</button>
        </div>
      </div>
    </div>
  );
};

export default ContentFooter;
