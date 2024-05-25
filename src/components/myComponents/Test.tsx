"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { follow, isFollowing, unfollow } from "@/lib/actions/follow";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";

const Test = () => {
  const followingId = 14;
  const {data: session} = useSession()

  const [isFollow, setIsFollow] = useState(false);
  const [followId, setFollowId] = useState(0);

  useEffect(() => {
    checkFollow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollow]);

  const checkFollow = async () => {
    if(!session) {
      return
    }

    const { data } = await isFollowing({ followerId : session.user.id, followingId });

    if (data) {
      setFollowId(data.id);
      setIsFollow(true);
      return;
    }

    setIsFollow(false);
    return data;
  };

  const debouncedFollow = useDebouncedCallback(async () => {
    if(!session) {
      return
    }

    if (isFollow) {
      const tes = await unfollow({ id: followId });
      setIsFollow(!isFollow);
      return console.log(tes);
    }

    const tes = await follow({ followerId: session.user.id, followingId });

    setIsFollow(!isFollow);

    console.log(tes);
  }, 500);

  return (
    <div>
      {isFollow ? (
        <Button onClick={() => debouncedFollow()} className="bg-slate-600">
          unfollow
        </Button>
      ) : (
        <Button onClick={() => debouncedFollow()} className="bg-blue-400">
          follow
        </Button>
      )}
    </div>
  );
};

export default Test;
