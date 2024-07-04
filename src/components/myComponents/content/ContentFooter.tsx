"use client";

import { isSaved, saveContent, unsaveContent } from "@/lib/actions/save";
import { useLikeStore } from "@/lib/store/likeStore";
import { ExternalLink, MessageCircle, Pin, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CommentSheet from "../Comment/CommentSheet";
import { useTheme } from "next-themes";
import { getComments, IComment } from "@/lib/actions/comment";
import Link from "next/link";

const ContentFooter = ({ contentId }: { contentId: number }) => {
  const [isLike, setIsLike] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [pinColor, setPinColor] = useState("black");
  const [comments, setComments] = useState<IComment[]>([]);
  const [likeId, setLikeId] = useState(0);
  const [saveId, setSaveId] = useState(0);

  const { data: session } = useSession();
  const { theme } = useTheme();

  const { checkLike, like, unlike } = useLikeStore();

  const checkIsLiked = async () => {
    try {
      if (!session) return;

      const { status, data } = await checkLike({ userId: session.user.id, contentId });
      setIsLike(status);
      if (!data) return;
      setLikeId(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIsSave = async () => {
    try {
      if (!session) return;

      const { data, status } = await isSaved({ userId: session.user.id, contentId });
      setIsSave(status);
      if (!data) return;
      setSaveId(data.id);
    } catch (error) {
      console.error(error);
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
    try {
      if (!session) return;

      if (!isLike) {
        setIsLike(true);
        return await like({ userId: session.user.id, contentId });
      }

      setIsLike(false);
      return await unlike({ id: likeId });
    } catch (error) {
      console.error(error);
    }
  }, 300);

  const debouncedSave = useDebouncedCallback(async () => {
    try {
      if (!session) return;

      if (!isSave) {
        setIsSave(true);
        return await saveContent({ userId: session.user.id, contentId });
      }

      setIsSave(false);
      return await unsaveContent({ id: saveId });
    } catch (error) {
      console.error(error);
    }
  }, 300);

  const getAllComment = async () => {
    try {
      const { data } = await getComments({ contentId });

      if (!data) return;

      return setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between m-2">
        <div className="flex gap-3">
          <button onClick={debouncedLike} aria-label="like button">
            {isLike ? <Star fill="#FFF200" color="#FFF200" aria-label="like button" /> : <Star aria-label="like button" />}
          </button>
          <button className="flex items-center" onClick={getAllComment} aria-label="comment ">
            <div className="hidden sm:flex">
              <CommentSheet contentId={contentId} comments={comments}>
                <MessageCircle className="cursor-pointer" aria-label="comment" />
              </CommentSheet>
            </div>
            <Link href={`/content/${contentId}/comments`}>
              <MessageCircle className="cursor-pointer sm:hidden" aria-label="comment" />
            </Link>
          </button>
          <button aria-label="share button">
            <ExternalLink aria-label="share button" />
          </button>
        </div>
        <div>
          <button onClick={debouncedSave} aria-label="save button">
            {isSave ? <Pin fill={pinColor} aria-label="save button" /> : <Pin aria-label="save button" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentFooter;
