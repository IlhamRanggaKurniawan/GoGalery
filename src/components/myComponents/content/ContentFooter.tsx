"use client";

import { isSaved, saveContent, unsaveContent } from "@/lib/actions/save";
import { useLikeStore } from "@/lib/store/likeStore";
import { ExternalLink, MessageCircle, Pin, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import  CommentSheet  from "../Comment/CommentSheet";
import { useTheme } from "next-themes";
import { getComments, IComment } from "@/lib/actions/comment";

const ContentFooter = ({ contentId }: { contentId: number }) => {
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [pinColor, setPinColor] = useState("black");
  const [comments, setComments] = useState<IComment[]>([]);

  const { data: session } = useSession();
  const { theme } = useTheme();

  const { checkLike, like, unlike } = useLikeStore();

  const checkIsLiked = async () => {
    if (session) {
      const res = await checkLike({ userId: session.user.id, contentId });
      setIsLike(res);
    }
  };

  const checkIsSave = async () => {
    if (session) {
      const res = await isSaved({ userId: session.user.id, contentId });
      setIsSave(res.status);
    }
  };

  useEffect(() => {
    checkIsLiked();
    checkIsSave();

    if (theme === "dark") {
      setPinColor("white");
    } else {
      setPinColor("black");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const debouncedLike = useDebouncedCallback(async () => {
    if (!session) {
      return;
    }

    if (!isLike) {
      setIsLike(true);
      return await like({ userId: session.user.id, contentId });
    }
    setIsLike(false);
    return await unlike({ userId: session.user.id, contentId });
  }, 300);

  const debouncedSave = useDebouncedCallback(async () => {
    if (!session) {
      return;
    }

    if (!isSave) {
      setIsSave(true);
      return await saveContent({ userId: session.user.id, contentId });
    }
    setIsSave(false);
    return await unsaveContent({ userId: session.user.id, contentId });
  }, 300);

  const getAllComment = async () => {
    const comments = await getComments({ contentId });

    if (comments) {
      setComments(comments);
    }
  };


  return (
    <div>
      <div className="flex justify-between m-2">
        <div className="flex gap-3">
          <button onClick={() => debouncedLike()}>{isLike ? <Star fill="#FFF200" color="#FFF200" /> : <Star />}</button>
          <button className="flex items-center" onClick={getAllComment}>
            <CommentSheet contentId={contentId} comments={comments}>
              <MessageCircle className="cursor-pointer" />
            </CommentSheet>
          </button>
          <button>
            <ExternalLink />
          </button>
        </div>
        <div>
          <button onClick={() => debouncedSave()}>{isSave ? <Pin fill={pinColor} /> : <Pin />}</button>
        </div>
      </div>
    </div>
  );
};

export default ContentFooter;
