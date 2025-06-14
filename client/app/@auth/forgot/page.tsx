import { ForgotForm } from "@/components/forgot-form";

export default function ForgotPage() {
  return (
    <div className="container max-w-md py-24 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Forgot password</h1>
      <ForgotForm />
    </div>
  );
}
