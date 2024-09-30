/* eslint-disable react/no-unescaped-entities */
"use client";

import { Separator } from "@/components/ui/separator";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import FormField from "./FormField";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!username || !password) return;

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/login`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const user = await response.json();

      router.push("/");

      localStorage.setItem("AccessToken", user.AccessToken);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-96 px-4 flex flex-col gap-3" onSubmit={login}>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-center">Connect Verse</h1>
          <Separator className="my-1" />
        </div>
        <div>
          <label htmlFor="password">Username</label>
          <FormField
            placeholder="Username"
            type="text"
            handleChange={setUsername}
            value={username}
            id="username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <FormField
            placeholder="Password"
            type="password"
            handleChange={setPassword}
            value={password}
            id="password"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Button
            className="w-full bg-slate-900 text-background rounded-xl"
            type="submit"
            disabled={loading}
          >
            Sign In
          </Button>
          <p className="text-sm">
            Don't have an account
            <Link href="/register" className="text-yellow-400">
              Sign Up
            </Link>
          </p>
          <Link href="/otp" className="text-yellow-400 text-right">
            Forgot Password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
