/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteAccount } from "@/lib/actions/user";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const DeleteAccountForm = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [validate, setValidate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (!session) return;
      if (validate !== "delete my account") {
        return setError("type delete my account correctly");
      }

      await deleteAccount({ id: session.user.id, username });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className="py-5 px-6 sm:py-10 sm:px-10 flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
      <h2 className="font-medium text-lg mb-2 text-red-500">Delete account</h2>
      <p>enter your username </p>
      <Input placeholder="username" className="rounded-xl w-full p-3 border-2 border-secondary h-12" onChange={(e) => setUsername(e.target.value)} />
      <p>
        type "<i>delete my account</i>" below:
      </p>
      <Input placeholder="delete my account" className="rounded-xl w-full p-3 border-2 border-secondary h-12" onChange={(e) => setValidate(e.target.value)} />
      {error && <span className="text-red-500">{error}</span>}
      <div className="flex justify-end">
        <Button className="max-w-24" type="submit">
          Delete
        </Button>
      </div>
    </form>
  );
};

export default DeleteAccountForm;
