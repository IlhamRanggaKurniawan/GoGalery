"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserProfile, updateProfile } from "@/lib/actions/user";
import { useSession } from "@/lib/hooks/useSession";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateProfileForm = () => {
  const { user: session } = useSession();
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(false)

  const setProfile = async () => {
    if (!session) return;

    const { data } = await getUserProfile({ username: session.username });

    if (!data) return;

    if (data.bio) setBio(data.bio);
    if (data.profileUrl) setProfilePicture(data.profileUrl);
  };

  const updateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true)
      if (!session) return;

      const formData = new FormData(e.currentTarget);

      const file = formData.get("file") as File;

      if (!bio && !file) return;

      const { data } = await updateProfile({ id: session.user.id, input: { bio, profileUrl: profilePicture }, formData });

      router.push(`/${data?.username}`);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    setProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <form className="py-5 px-6 sm:py-10 sm:px-10 flex flex-col gap-3 w-full" onSubmit={updateAccount}>
      <h2 className="font-medium text-lg mb-2">Edit Profile</h2>
      <div className="flex flex-col items-center justify-center gap-5 bg-secondary p-4 rounded-xl ">
        <Avatar className="h-28 w-28">
          <AvatarImage src={profilePicture ? profilePicture : `/profile-picture.jpg`} alt="@shadcn" />
          <AvatarFallback>{session?.user.username}</AvatarFallback>
        </Avatar>
        <div>
          <label htmlFor="file" className="w-full bg-primary p-3 rounded-lg cursor-pointer">
            <span className="text-background">Change Profile Picture</span>
          </label>
          <Input type="file" placeholder="change profile picture" className="hidden" id="file" name="file" />
        </div>
      </div>
      <div>
        <h3 className="font-medium px-2 mb-1">Bio</h3>
        <textarea placeholder="Bio" className="rounded-xl w-full p-3 border-2 border-secondary resize-none" onChange={(e) => setBio(e.target.value)} value={bio} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="max-w-24" disabled={loading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
