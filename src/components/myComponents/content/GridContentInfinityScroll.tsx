"use client";

import { IContent } from "@/lib/actions/content";
import Link from "next/link";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ContentMain from "./ContentMain";

const GridContentInfinityScroll = ({ contentFuction, parameter }: { contentFuction: any; parameter?: any }) => {
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
        const result = parameter ? await contentFuction({ parameter, cursor: nextCursor, pageSize: 12 }) : await contentFuction({cursor: nextCursor, pageSize: 12 });
        setContents((prevContents) => [...prevContents, ...result.contents]);
        setNextCursor(result.nextCursor ?? null);
      }
    } catch (error) {
      console.error("Failed to load contents:", error);
      setError("Failed to load contents");
    } finally {
      setLoading(false);
    }
  }, [loading, nextCursor, parameter, contentFuction]);

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

  return (
    <div>
      {contents.length ? (
        <div className="grid grid-cols-3 gap-[1px] m-1 sm:mt-2 sm:gap-1">
          {contents.map((content) => (
            <Link href={parameter ? `/${parameter}/${content.id}` : `/explore/${content.id}`} key={content.id}>
              <ContentMain url={content.url} alt={content.caption} preview={true} />
            </Link>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      {error && <p className="text-red-600">{error}</p>}

      <div ref={triggerRef} className="w-full h-1"></div>
    </div>
  );
};

export default GridContentInfinityScroll;
