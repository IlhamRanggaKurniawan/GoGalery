"use client"

import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import Button from './Button'
import { useSession } from '@/lib/hooks/useSession'
import apiClient from '@/lib/apiClient'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'

const UpdateProfileForm = () => {
  const { user } = useSession()
  const [bio, setBio] = useState(user?.bio)
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (selectedFile.type.split("/").shift() !== "image") {
      return
    }

    if (selectedFile && selectedFile.size > maxSize) {
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!user) return;

      const formData = new FormData();

      if (file) {
        formData.append("file", file)
      }
      formData.append("bio", e.currentTarget.bio.value)
      formData.append("profileUrl", user.profileUrl)

      const data = await apiClient.patch(`/user/update/${user.id}`, {
        body: formData,
        cache: "no-cache"
      })

      router.push(`/profile/${data.Username}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className='m-4' onSubmit={handleSubmit}>
      <div className='bg-muted flex flex-col items-center rounded-2xl mx-3 p-6 gap-6'>
        <div className='w-28 h-28'>
          <Avatar profilePicture={user?.profileUrl} username={user?.username ?? ""} />
        </div>
        <div>
          <label htmlFor="file" className="w-full bg-primary p-3 rounded-lg cursor-pointer">
            <span className="text-background">{file ? "upload success" : "Change Profile Picture"}</span>
          </label>
          <Input type="file" placeholder="change profile picture" className="hidden" id="file" name="file" onChange={handleChange} />
        </div>
      </div>
      <div className='px-4 my-4'>
        <label className="px-2 mb-1" htmlFor='bio'>Bio</label>
        <textarea placeholder="Bio" className="rounded-xl w-full p-3 border-2 border-muted resize-none" id='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>
      <div className='px-4'>
        <Button className='bg-primary rounded-2xl' type="submit">
          <p className='text-background'>Update</p>
        </Button>
      </div>
    </form>
  )
}

export default UpdateProfileForm