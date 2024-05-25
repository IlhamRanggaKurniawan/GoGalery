"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { follow, isFollowing, unfollow } from "@/lib/actions/follow";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";

const FollowButton = ({ userId }: { userId: number }) => {
  const followingId = userId;
  const { data: session } = useSession();

  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkFollow = async () => {
    if (!session) {
      return;
    }

    const { data } = await isFollowing({ followerId: session.user.id, followingId });

    if (data) {
      setFollowId(data.id);
      setIsFollow(true);
      return;
    }

    setIsFollow(false);
    return data;
  };

  useEffect(() => {
    checkFollow();
  }, [isFollow, checkFollow]);

  const debouncedFollow = useDebouncedCallback(async () => {
    if (!session) {
      return;
    }

    if (isFollow) {
      const tes = await unfollow({ id: followId });
      setIsFollow(!isFollow);
      return console.log(tes);
    }

    const tes = await follow({ followerId: session.user.id, followingId });

    setIsFollow(!isFollow);

    return tes;
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
