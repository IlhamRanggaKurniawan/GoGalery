"use client";

import { Separator } from "@/components/ui/separator";
import { getComments, IComment, sendComment } from "@/lib/actions/comment";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CommentPage = ({ contentId }: { contentId: number }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const { data: session } = useSession();
  const router = useRouter()

  const getAllComments = async () => {
    const { data } = await getComments({ contentId });

    setComments(data);
  };

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!session) return;

      const { data } = await sendComment({ text, userId: session.user.id, contentId });

      if (!data) return;

      setText("");
      comments.unshift(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" sm:m-0 p-0 pt-0">
      <div className="p-2 flex justify-between">
        <h1 className="text-center">Comment Section</h1>
        <button onClick={() => router.back()}>
          <X />
        </button>
      </div>
      <Separator className="my-1" />
      <div className="flex flex-col pb-2 h-[552px] gap-1 overflow-y-auto px-3">
        {comments.map((comment) => (
          <Comment
            text={comment.text}
            username={comment.user.username}
            key={comment.id}
            createdAt={comment.createdAt}
            uploader={comment.content.uploader.username}
            commentId={comment.id}
            profilePicture={comment.user.profileUrl}
          />
        ))}
      </div>
      <form className="w-full h-14 border-y-2" onSubmit={submitComment}>
        <Input required placeholder="Send a comment" className="border-0 rounded-none h-14" value={text} onChange={(e) => setText(e.target.value)} />
      </form>
    </div>
  );
};

export default CommentPage;
