"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/actions/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UpdateProfileForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [bio, setBio] = useState("");

    const updateAccount = async (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!session) return;

        const account = await updateProfile({ id: session.user.id, data: { bio } });

        if (account) {
            router.push(`/${account.username}`);
        }
    };

    return (
        <form className="py-5 px-6 sm:py-10 sm:px-10 flex flex-col gap-3 w-full" onSubmit={updateAccount}>
            <h2 className="font-medium text-lg mb-2">Edit Profile</h2>
            <div className="bg-secondary rounded-xl flex items-center p-3">
                <div className="w-full flex gap-3 items-center">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>ilham</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium">Ilham</h3>
                </div>
                <Button>Change Photo</Button>
            </div>
            <div>
                <h3 className="font-medium px-2 mb-1">Bio</h3>
                <textarea placeholder="Bio" className="rounded-xl w-full p-3 border-2 border-secondary resize-none" onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="flex justify-end">
                <Button type="submit" className="max-w-24">Submit</Button>
            </div>
        </form>
    );
};

export default UpdateProfileForm;