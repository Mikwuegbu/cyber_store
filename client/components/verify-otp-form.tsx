"use client";

import type React from "react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth_store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { authServices } from "@/services/auth.services";
import { useRouter } from "next/navigation";

export function VerifyForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuthStore();
  const [otp, setOtp] = useState<string>("");
  const { replace } = useRouter();
  const mutate = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      authServices.verifyOTP(email, token),
    onSuccess: () => {
      setIsLoading(false);
      login(); //TODO: handle redirects here
      replace("/");
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      await mutate.mutateAsync({ email: user?.email ?? "", token: otp });
    } catch (error: any) {
      setError(error.response?.data?.message ?? "An error occurred");
      setIsLoading(false);
    }
  };

  // const handleSignupClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   replace("/?signup=true");
  // };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-8">
        <Label>Enter 6-digit PIN from {user?.email}</Label>

        <div className="grid justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
          >
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
          disabled
          // onClick={handleSignupClick}
        >
          Click
        </Button>
      </div>
    </form>
  );
}
