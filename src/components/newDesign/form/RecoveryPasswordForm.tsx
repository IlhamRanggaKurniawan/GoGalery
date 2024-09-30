"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAccountRecoveryStore } from "@/lib/store/accountRecoveryStore";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useEffect } from "react";

const RecoveryPasswordForm = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState("")

  const { email } = useAccountRecoveryStore();

  const router = useRouter();
  if (!email) router.push("/otp");

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (password !== confPassword) return setError("Password doen't match");
      if (otp.length !== 6) return setError("invalid OTP");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/password/${email}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            password,
            otp,
          }),
        }
      );

      if (!response.ok) {
        return setError("invalid OTP")
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      if (resendCooldown > 0) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/otp/${email}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        return setError("Failed to resend OTP")
      }

      setResendCooldown(60);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="m-4 flex flex-col gap-3" onSubmit={handleSubmit}>
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div>
          <label htmlFor="password">New Password</label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            value={password}
            type="password"
            id="password"
            className="border border-slate-300 "
          />
        </div>
        <div>
          <label htmlFor="confPassword">Confirm Password</label>
          <Input
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="Confirm Password"
            value={confPassword}
            type="password"
            id="confPassword"
            className="border border-slate-300"
          />
        </div>

        <Button
          onClick={resendOtp}
          variant={"ghost"}
          disabled={resendCooldown > 0 || loading}
          className="rounded-2xl w-fit"
        >
          {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
        </Button>
        <span className="text-right text-red-500">{error}</span>
        <Button className="bg-primary rounded-2xl" disabled={loading}>
          <p className="text-background">Recovery Password</p>
        </Button>
      </form>
    </div>
  );
};

export default RecoveryPasswordForm;
