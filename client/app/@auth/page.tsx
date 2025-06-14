import { AuthModal } from "@/components/auth-modal";
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { ClientOnly } from "@/components/client-only";

export default function AuthModalPage({
  searchParams,
}: {
  readonly searchParams: {
    readonly [key: string]: string | string[] | undefined;
  };
}) {
  const showLogin = searchParams.login === "true";
  const showSignup = searchParams.signup === "true";
  const showForgot = searchParams.forgot === "true";
  const showVerify = searchParams.verify === "true";

  if (!showLogin && !showSignup) {
    return null;
  }

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
          <LoginForm />
        </AuthModal>
      )}
      {showVerify && (
        <AuthModal title="Verify your account">
          <LoginForm />
        </AuthModal>
      )}
    </ClientOnly>
  );
}
