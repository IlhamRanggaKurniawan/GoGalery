/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { IContent } from "@/lib/actions/content";
import ContentSkeleton from "./ContentSkeleton";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { findUser, IUserPreview } from "@/lib/actions/user";
import Link from "next/link";
import AccountPreview from "../AccountPreview";
const Content = dynamic(() => import("./Content"), {
  loading: () => <ContentSkeleton />,
});

const StraightContentInfinityScroll = ({ contentFuction, id, accountUsername, homePage }: { contentFuction: any; id?: number; accountUsername?: string; homePage?: boolean }) => {
  const { data: session } = useSession();

  const [contents, setContents] = useState<IContent[]>([]);
  const [users, setUsers] = useState<IUserPreview[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreContents = async () => {
    try {
      if (!session) return;
      if (nextCursor === null) return;

      const { data, nextCursor: cursor } = await contentFuction({ id, accountUsername, cursor: nextCursor, pageSize: 3, username: session.user.username, userId: session.user.id });

      setContents((prevContents) => [...prevContents, ...data]);
      setNextCursor(cursor ?? null);

      if (!data || data.length === 0) {
        const { data } = await findUser({ username: "" });

        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
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
  }, [nextCursor, session]);

  return (
    <div>
      <div className="w-full flex flex-col gap-3 items-center">
        {contents.map((content: IContent) => {

          return (
            <Content
              caption={content.caption}
              uploader={content.uploader.username}
              url={content.url}
              key={content.id}
              contentId={content.id}
              profilePicture={content.uploader.profileUrl}
              id={content.id}
            />
          );
        })}
      </div>
      {homePage && contents.length === 0 && (
        <div className="w-full px-4 flex flex-col items-center pt-2">
          <h2 className="font-medium">Suggested for you:</h2>
          {users.map((user: IUserPreview) => {
            if (user.username === session?.user.username) return;

            return (
              <Link href={`/${user.username}`} className="flex items-center cursor-pointer gap-3 w-full max-w-96" key={user.id}>
                <AccountPreview username={user.username} profilePicture={user.profileUrl} />
              </Link>
            );
          })}
        </div>
      )}
      <div ref={triggerRef} className="w-full h-1" />
    </div>
  );
};

export default StraightContentInfinityScroll;
