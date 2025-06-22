"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { authServices } from "@/services/auth.services";
import { useAuthStore } from "@/store/auth_store";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const { setUser } = useAuthStore();
  const mutation = useMutation({
    mutationFn: ({
      email,
      password,
      displayname,
    }: {
      email: string;
      password: string;
      displayname: string;
    }) => authServices.register(email, password, displayname),
    onSuccess: () => {
      setIsLoading(false);
      replace("/?verify=true");
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await mutation.mutateAsync({
        email,
        password,
        displayname: name,
      });
      setUser({ email, displayname: name });
    } catch (err: any) {
      setIsLoading(false);

      setError(err.response?.data?.message ?? "An error occurred");
      console.error("Signup error:", err);
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    replace("/?login=true");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign up"}
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
