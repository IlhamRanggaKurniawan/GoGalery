"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChangePasswordForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    if (password !== confPassword) {
      return setError("password doesn't match");
    }

    const { data } = await updateProfile({ id: session.user.id, data: { password } });

    router.push(`/${data?.username}`);
  };

  return (
    <form className="py-5 px-6 sm:py-10 sm:px-10 flex flex-col gap-3 w-full" onSubmit={updatePassword}>
      <h2 className="font-medium text-lg mb-2 ">Update Password</h2>
      <div>
        <h3 className="font-medium px-2 mb-1">new password</h3>
        <Input placeholder="Password" className="rounded-xl w-full p-3 h-12" type="password" onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <h3 className="font-medium px-2 mb-1">Confirm password</h3>
        <Input placeholder="Confirm Password" className="rounded-xl w-full p-3 h-12" type="password" onChange={(e) => setConfPassword(e.target.value)} required />
      </div>
      {error && <span className="text-red-500">{error}</span>}
      <div className="flex justify-end">
        <Button className="max-w-24" type="submit">
          Change
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
