"use client";

import { IContent } from "@/lib/actions/content";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import ContentSkeleton from "./ContentSkeleton";
import { useSession } from "next-auth/react";
const ContentMain = dynamic(() => import("./ContentMain"), {
  loading: () => <ContentSkeleton />,
});

const GridContentInfinityScroll = ({ contentFuction, accountUsername, href }: { contentFuction: any; accountUsername?: string; href: string }) => {
  const { data: session } = useSession();

  const [contents, setContents] = useState<IContent[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreContents = async () => {
    if (nextCursor === null) return;

    const { data, nextCursor: cursor } = await contentFuction({ accountUsername, cursor: nextCursor, pageSize: 15, username: session?.user.username });

    if (!data) {
      return setError("Failed to load contents");
    }

    setContents((prevContents) => [...prevContents, ...data]);
    setNextCursor(cursor ?? null);
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
      {contents.length === 1 && (
        <div className="grid grid-cols-3 gap-[1px] m-1 sm:mt-2 sm:gap-1">
          {contents.map((content) => (
            <Link href={`/${href}/${content.id}`} key={content.id}>
              <ContentMain url={content.url} alt={content.caption} preview={true} />
            </Link>
          ))}
        </div>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <div ref={triggerRef} className="w-full h-1" />
    </div>
  );
};

export default GridContentInfinityScroll;
