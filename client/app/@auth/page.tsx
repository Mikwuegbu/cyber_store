import { AuthModal } from "@/components/auth-modal";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { ClientOnly } from "@/components/client-only";
import { ForgotForm } from "@/components/forgot-form";
import { VerifyForm } from "@/components/verify-otp-form";

interface SearchParams {
  login?: string;
  signup?: string;
  forgot?: string;
  verify?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function AuthModalPage({ searchParams }: Readonly<Props>) {
  // Wait for all searchParams to be resolved
  const params = await searchParams;

  const showLogin = params.login === "true";
  const showSignup = params.signup === "true";
  const showForgot = params.forgot === "true";
  const showVerify = params.verify === "true";

  if (!(showLogin || showSignup || showForgot || showVerify)) return null;

  return (
    <ClientOnly>
      {showLogin && (
        <AuthModal title="Login to your account">
          <LoginForm />
        </AuthModal>
      )}
      {showSignup && (
        <AuthModal title="Create an account">
          <SignupForm />
        </AuthModal>
      )}
      {showForgot && (
        <AuthModal title="Forgot password">
          <ForgotForm />
        </AuthModal>
      )}
      {showVerify && (
        <AuthModal title="Verify your account">
          <VerifyForm />
        </AuthModal>
      )}
    </ClientOnly>
  );
}
