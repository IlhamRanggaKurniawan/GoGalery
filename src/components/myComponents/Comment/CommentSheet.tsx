"use client";

import React, { FormEvent, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import Comment from "./Comment";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { IComment, sendComment } from "@/lib/actions/comment";

const CommentSheet = ({ children, contentId, comments }: { children: React.ReactNode; contentId: number; comments: IComment[] }) => {
  const [text, setText] = useState("");
  const { data: session } = useSession();

  const submitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) return;

    const { data } = await sendComment({ text, userId: session.user.id, contentId });

    if (data) {
      setText("");
      comments.unshift(data);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="mt-[20vh] w-screen h-full sm:m-0 sm:max-w-96 px-0 pt-0">
        <SheetHeader className="py-2">
          <SheetTitle className="text-center">Comment Section</SheetTitle>
        </SheetHeader>
        <Separator className="my-1" />
        <div className="flex flex-col pb-4 h-[26rem] sm:h-[633px] gap-1 overflow-y-auto px-3">
          {comments.map((comment) => (
            <Comment text={comment.text} username={comment.user.username} key={comment.id} createdAt={comment.createdAt} uploader={comment.content.uploader.username} commentId={comment.id} profilePicture={comment.user.profileUrl}/>
          ))}
        </div>
        <form className="w-full h-14 border-y-2" onSubmit={submitComment}>
          <Input required placeholder="Send a comment" className="border-0 rounded-none h-14" value={text} onChange={(e) => setText(e.target.value)} />
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
