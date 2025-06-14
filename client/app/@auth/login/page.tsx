import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="container max-w-md py-24 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
      <LoginForm />
    </div>
  );
}
