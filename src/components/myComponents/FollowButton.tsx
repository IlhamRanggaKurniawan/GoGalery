"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import { useFollowStore } from "@/lib/store/followStore";

const FollowButton = ({ userId }: { userId: number }) => {
  const followingId = userId;
  const { data: session } = useSession();

  const { isFollow, checkFollow, toggleFollow } = useFollowStore()


  useEffect(() => {
    if(session) {
      checkFollow({followerId: session.user.id, followingId});
    }
  }, [isFollow, checkFollow, session, followingId]);

  
  const debouncedFollow = useDebouncedCallback(async () => {
    if(session) {
      await toggleFollow({followerId: session.user.id, followingId})
    }
  }, 500);


  return (
    <div>
      {isFollow ? (
        <Button onClick={() => debouncedFollow()} className="bg-slate-600 py-4 px-8 max-w-24">
          unfollow
        </Button>
      ) : (
        <Button onClick={() => debouncedFollow()} className="bg-blue-400 py-4 px-8 max-w-24">
          follow
        </Button>
      )}
    </div>
  );
};

export default FollowButton;
