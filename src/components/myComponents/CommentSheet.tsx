import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";

const CommentSheet = ({ children, side }: { children: React.ReactNode; side: "left" | "bottom" | "top" | "right" }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={side} className="h-[80vh] w-screen max-w-96 sm:h-full">
        <SheetHeader className="flex items-center justify-center">
          <SheetTitle className="text-xl">Comment Section</SheetTitle>
        </SheetHeader>
        <Separator className="my-1" />
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
