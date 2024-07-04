/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {data: session} = useSession()

  if(session) {
    router.push("/")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError("")
      const result = await signIn("credentials", {
        username: e.currentTarget.username.value,
        password: e.currentTarget.password.value,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        return setError(result.error);
      }

      router.push("/");
    } catch (error) {
      setError((error as Error).message)
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="w-full p-6 rounded-lg shadow-m max-w-[26rem]">
        <div className="mb-3 ">
          <h1 className="text-center font-bold">Connect Verse</h1>
        </div>
        <Separator className="my-2" />
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="username">username</label>
            <Input id="username" type="text" required placeholder="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <Input id="password" type="password" required placeholder="password" name="password" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <Button className="w-full font-bold" type="submit">
              login
            </Button>
          </div>
        </form>
        <div>
          <Link href="/register">
            <span> don't have account? </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
