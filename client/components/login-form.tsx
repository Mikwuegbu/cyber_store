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
import { useMutation } from "@tanstack/react-query";
import { authServices } from "@/services/auth.services";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { replace } = useRouter();
  const mutate = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authServices.login(email, password),
    onSuccess: () => {
      setIsLoading(false);
      login();
      replace("/");
    },
    onError: (error: any) => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await mutate.mutateAsync({
        email: email.trim(),
        password: password.trim(),
      });
    } catch (error: any) {
      setError(error.response?.data?.message ?? "An error occurred");
      setIsLoading(false);
    }
  };

  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    replace("/?signup=true");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => replace("/?forgot=true")}
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={handleSignupClick}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}
