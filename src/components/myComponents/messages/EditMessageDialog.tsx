import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { deleteMessage } from "@/lib/actions/messaging";
import React from "react";

const EditMessageDialog = ({ children, id }: { children: React.ReactNode; id: number }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogClose className="flex flex-col gap-2">
          <Button variant={"destructive"} className="w-full" onClick={() => deleteMessage({ id })}>
            Delete message
          </Button>
          <Button className="w-full" variant={"secondary"}>
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditMessageDialog;
