"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IContent } from "@/lib/actions/content";
import ContentSkeleton from "./ContentSkeleton";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
const Content = dynamic(() => import("./Content"), {
  loading: () => <ContentSkeleton />
})

const StraightContentInfinityScroll = ({ contentFuction, parameter }: { contentFuction: any; parameter?: any }) => {
  const {data: session} = useSession()


  const [contents, setContents] = useState<IContent[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  
  const loadMoreContents = useCallback(async () => {
    if (loading || nextCursor === null) return;

    setLoading(true);
    try {
      if (nextCursor !== null) {
        const result = await contentFuction({ ...parameter, cursor: nextCursor, pageSize: 3, username: session?.user.username  })
        setContents((prevContents) => [...prevContents, ...result.contents]);
        setNextCursor(result.nextCursor ?? null);
      }
    } catch (error) {
      console.error("Failed to load contents:", error);
      setError("Failed to load contents");
    } finally {
      setLoading(false);
    }
  }, [loading, nextCursor, contentFuction, parameter, session?.user.username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor !== null) {
          loadMoreContents();
        }
      },
      { threshold: 1.0 }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current);
      }
    };
  }, [loadMoreContents, nextCursor]);

  if(!session) {
    return
  }

  return (
    <div>
      {contents.length > 0 ? (
        contents.map((content: IContent) => <Content caption={content.caption} uploader={content.uploader.username} url={content.url} key={content.id} contentId={content.id}/>)
      ) : (
        <div></div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <div ref={triggerRef} className="w-full h-1"></div>
    </div>
  );
};

export default StraightContentInfinityScroll;
