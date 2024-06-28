"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { deleteContent } from '@/lib/actions/content'
import React from 'react'

const DeleteContentDialog = ({children, id} : {children: React.ReactNode, id: number}) => {
    const handleClick = async () => {
        await deleteContent({id})
    }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogClose className="flex flex-col gap-2">
          <Button variant={"destructive"} className="w-full" onClick={handleClick}>
            Delete comment
          </Button>
          <Button className="w-full" variant={"secondary"}>
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteContentDialog