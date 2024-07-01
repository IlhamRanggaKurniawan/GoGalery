"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import register from "@/lib/actions/authentication";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const RegisterForm = () => {
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const router = useRouter();

  const {data: session} = useSession()

  if(session) {
    router.push("/")
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError("");

      if (!username || !email || !password || !confPassword) {
        return setError("please fill all the fields");
      }
      if (password !== confPassword) {
        return setError("password doesn't match");
      }

      const { error } = await register({
        username,
        email,
        password,
      });

      if (error) {
        return setError(error);
      }

      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        return setError(result.error);
      }

      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="w-full p-6 rounded-lg shadow-m max-w-[26rem]">
        <div className="mb-3 ">
          <h1 className="text-center font-bold"> SpaceShip Social media</h1>
        </div>
        <Separator className="my-2" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <Input id="username" type="text" required placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <Input id="email" type="email" required placeholder="email" name="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <Input id="password" type="password" required placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confPassword">confirm password</label>
            <Input id="confPassword" type="password" required placeholder="confirm password" name="confPassword" onChange={(e) => setConfPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <Button className="w-full font-bold" type="submit">
              register
            </Button>
          </div>
        </form>
        <div>
          <Link href="/login">already have account?</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
