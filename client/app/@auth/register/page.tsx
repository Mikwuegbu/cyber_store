import { SignupForm } from "@/components/signup-form";

export default function SignupPage() {
  return (
    <div className="container max-w-md py-24 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      <SignupForm />
    </div>
  );
}
