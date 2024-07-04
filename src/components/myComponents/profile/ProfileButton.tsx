"use client";

import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import { useFollowStore } from "@/lib/store/followStore";
import Link from "next/link";
import { checkExistingDM, createDM } from "@/lib/actions/messaging";
import { useRouter } from "next/navigation";

const ProfileButton = ({ userId }: { userId: number }) => {
  const followingId = userId;
  const { data: session } = useSession();
  const { isFollow, checkFollow, toggleFollow } = useFollowStore();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    checkFollow({ followerId: session.user.id, followingId });
  }, [isFollow, checkFollow, session, followingId]);

  const debouncedFollow = useDebouncedCallback(async () => {
    if (!session) return;

    await toggleFollow({ followerId: session.user.id, followingId });
  }, 500);

  if (followingId === session?.user.id) {
    return (
      <Button className="sm:hidden">
        <Link href="/setting"> Edit Profile </Link>
      </Button>
    );
  }

  const handleClick = async () => {
    if (!session) return;

    const { data } = await checkExistingDM({ participantIDs: [followingId, session.user.id] });

    if (data) {
      return router.push(`/messages/${data.id}`);
    }

    const { data: res } = await createDM({ participants: [{ id: followingId }, { id: session.user.id }] });

    return router.push(`/messages/${res?.id}`);
  };

  return (
    <div className="flex justify-center my-2 gap-2">
      <div>
        {isFollow && session?.user.id ? (
          <Button onClick={() => debouncedFollow()} className="bg-slate-600 py-4 px-8 max-w-24">
            unfollow
          </Button>
        ) : (
          <Button onClick={() => debouncedFollow()} className="bg-blue-400 py-4 px-8 max-w-24">
            follow
          </Button>
        )}
      </div>
      {followingId !== session?.user.id && (
        <Button className="py-4 px-8 max-w-24" onClick={handleClick}>
          Message
        </Button>
      )}
    </div>
  );
};

export default ProfileButton;
