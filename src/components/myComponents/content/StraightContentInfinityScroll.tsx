"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllContent, IContent } from "@/lib/actions/content";
import ContentSkeleton from "./ContentSkeleton";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
const Content = dynamic(() => import("./Content"), {
  loading: () => <ContentSkeleton />,
});

const StraightContentInfinityScroll = ({ contentFuction, id, accountUsername }: { contentFuction: any; id?: number; accountUsername?: string }) => {
  const { data: session } = useSession();

  const [contents, setContents] = useState<IContent[]>([]);
  const [altContents, setAltContents] = useState<IContent[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreContents = async () => {
    if (nextCursor === null) return;

    const { data, nextCursor: cursor } = await contentFuction({ id, accountUsername, cursor: nextCursor, pageSize: 3, username: session?.user.username, userId: session?.user.id });

    setContents((prevContents) => [...prevContents, ...data]);
    setNextCursor(cursor ?? null);

    if (!data || data.length === 0) {
      const { data, nextCursor: cursor } = await getAllContent({ cursor: nextCursor, pageSize: 3 });
      setAltContents((prevContents) => [...prevContents, ...data]);
      setNextCursor(cursor ?? null);
      return;
    }

    setError("Failed to load contents");
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextCursor]);

  return (
    <div>
      {contents.length > 0 ? (
        contents.map((content: IContent) => <Content caption={content.caption} uploader={content.uploader.username} url={content.url} key={content.id} contentId={content.id} />)
      ) : (
        <div>
          {altContents.map((content: IContent) => (
            <Content caption={content.caption} uploader={content.uploader.username} url={content.url} key={content.id} contentId={content.id} />
          ))}
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <div ref={triggerRef} className="w-full h-1"></div>
    </div>
  );
};

export default StraightContentInfinityScroll;
