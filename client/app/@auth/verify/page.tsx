import { VerifyForm } from "@/components/verify-otp-form";

export default function VerifyPage() {
  return (
    <div className="container max-w-md py-24 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Verify your account</h1>
      <VerifyForm />
    </div>
  );
}
