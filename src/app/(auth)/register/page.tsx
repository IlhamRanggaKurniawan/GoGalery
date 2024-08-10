/* eslint-disable react/no-unescaped-entities */
"use client"

import FormField from "@/components/newDesign/FormField";
import Header from "@/components/newDesign/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Page = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const register = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!username || !password) return;

      setLoading(true);

      const user = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        username,
        email,
        password,
        confirmPassword,
      }, { withCredentials: true });

      localStorage.setItem("AccessToken", user.data.AccessToken);

      router.push("/")

    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-96 px-4 flex flex-col gap-3" onSubmit={register}>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-center">Connect Verse</h1>
          <Separator className="my-1" />
        </div>
        <div>
          <label htmlFor="password">Username</label>
          <FormField placeholder="Username" type="text" handleChange={setUsername} value={username} id="username" required/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <FormField placeholder="email" type="email" handleChange={setEmail} value={email} id="email" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <FormField placeholder="Password" type="password" handleChange={setPassword} value={password} id="password" required/>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <FormField placeholder="confirm Password" type="password" handleChange={setConfirmPassword} value={confirmPassword} id="confirmPassword" required/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Button className="w-full" type="submit" disabled={loading}>
            Sign Up
          </Button>
          <p className="text-sm">Already have an account? <Link href="/login" className="text-yellow-400">Sign In</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Page;
