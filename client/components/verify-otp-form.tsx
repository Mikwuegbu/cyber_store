"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function VerifyForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsLoading(true);
  // };

  // const handleSignupClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   replace("/?signup=true");
  // };

  return (
    <form className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-8">
        <Label>Enter 6-digit PIN from userEmail</Label>

        <div className="grid justify-center">
          <InputOTP maxLength={6}>
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
        </div>
      </div>
      <Button type="submit" className="w-full mt-6" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
      <div className="text-center text-sm">
        Didn&apos;t recieve an OTP?{" "}
        <Button
          variant="link"
          className="p-0 h-auto"
          // onClick={handleSignupClick}
        >
          Click
        </Button>
      </div>
    </form>
  );
}
