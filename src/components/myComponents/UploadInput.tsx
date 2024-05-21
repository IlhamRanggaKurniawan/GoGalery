"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upload } from "@/lib/actions/content";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const UploadInput = () => {

    const router = useRouter()
    const {data: session } = useSession()

    const handleSubmit = async (formData: FormData,) => {

        const uploaderId = session?.user?.id

        const file = (formData.get("file")) as File

        if(!(file instanceof File)) {
            return console.log("please fill all the fields")
        }

        const fileType = file.type

        if(fileType.split("/").shift() !== "image") {
          return console.log("file type must be images")
        }

        if(!uploaderId) {
            return console.log("cannot upload")
        }
        
        const respond = await upload({formData, uploaderId})

        if(respond.error) {
            return console.log(respond.error)
        }

        router.push(`/${session.user.username}`)

    }



  return (
    <form action={handleSubmit}>
      <Input type="file" accept="images/*" id="file" name="file" required />
      <Input type="text" id="caption" name="caption" required />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UploadInput;
