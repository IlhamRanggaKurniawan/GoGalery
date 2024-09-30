"use client";

import React, { FormEvent, useState } from "react";
import FormField from "./FormField";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useAccountRecoveryStore } from "@/lib/store/accountRecoveryStore";
import Link from "next/link";

const SendOtpForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { setEmail: emailSetter } = useAccountRecoveryStore();

  const sendOTP = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!email) return;
      setLoading(true);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/otp/${email}`, {
        method: "POST",
        credentials: "include",
      });

      emailSetter(email)

      router.push("/otp/password");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-96 px-4 flex flex-col gap-3" onSubmit={sendOTP}>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-center">Connect Verse</h1>
          <Separator className="my-1" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <FormField
            placeholder="Email"
            type="email"
            handleChange={setEmail}
            value={email}
            id="email"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Button
            className="w-full bg-slate-900 text-background rounded-xl"
            type="submit"
            disabled={loading}
          >
            Send Otp
          </Button>
        </div>
        <Link href="/login">Back to Login Page</Link>
      </form>
    </div>
  );
};

export default SendOtpForm;
