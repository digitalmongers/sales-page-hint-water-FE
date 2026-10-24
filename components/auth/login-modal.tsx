"use client";

import { useRef, useState, type ComponentProps, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  LockPasswordIcon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

type AuthMode = "login" | "signup";
type Provider = "google" | "facebook";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: AuthMode;
  onLoginSuccess?: (user: UserProfile) => void;
}

/* ---------- Brand icons (official brand colours) ---------- */

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77Z"
      />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}

/* ---------- Shared pieces ---------- */

function SocialButtons({
  mode,
  loading,
  onSelect,
}: {
  mode: AuthMode;
  loading: Provider | "email" | null;
  onSelect: (provider: Provider) => void;
}) {
  const verb = mode === "login" ? "Continue" : "Sign up";
  return (
    <div className="grid gap-2.5">
      <Button
        id={`${mode}-google-btn`}
        type="button"
        variant="outline"
        size="lg"
        disabled={loading !== null}
        aria-busy={loading === "google"}
        onClick={() => onSelect("google")}
        className="h-11 w-full gap-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
      >
        {loading === "google" ? (
          <Spinner className="size-5" />
        ) : (
          <>
            <GoogleLogo />
            {verb} with Google
          </>
        )}
      </Button>
      <Button
        id={`${mode}-facebook-btn`}
        type="button"
        variant="outline"
        size="lg"
        disabled={loading !== null}
        aria-busy={loading === "facebook"}
        onClick={() => onSelect("facebook")}
        className="h-11 w-full gap-3 text-sm font-medium transition-all hover:-translate-y-px hover:shadow-md"
      >
        {loading === "facebook" ? (
          <Spinner className="size-5" />
        ) : (
          <>
            <FacebookLogo />
            {verb} with Facebook
          </>
        )}
      </Button>
    </div>
  );
}

function OrDivider() {
  return (
    <div className="relative flex items-center gap-3 py-1">
      <Separator className="flex-1" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        or with email
      </span>
      <Separator className="flex-1" />
    </div>
  );
}

function IconInput({
  id,
  icon,
  className,
  ...props
}: ComponentProps<typeof Input> & { icon: typeof Mail01Icon }) {
  return (
    <div className="relative">
      <HugeiconsIcon
        icon={icon}
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input id={id} className={`h-11 ps-9 ${className ?? ""}`} {...props} />
    </div>
  );
}

function PasswordInput({
  id,
  autoComplete,
}: {
  id: string;
  autoComplete: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <HugeiconsIcon
        icon={LockPasswordIcon}
        className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id={id}
        name="password"
        type={visible ? "text" : "password"}
        placeholder="••••••••"
        autoComplete={autoComplete}
        required
        minLength={8}
        className="h-11 ps-9 pe-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((v) => !v)}
        className="absolute end-1.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <HugeiconsIcon icon={visible ? ViewOffIcon : ViewIcon} className="size-4" />
      </Button>
    </div>
  );
}

/* ---------- Modal ---------- */

export function LoginModal({
  open,
  onOpenChange,
  defaultMode = "login",
  onLoginSuccess,
}: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [loading, setLoading] = useState<Provider | "email" | null>(null);
  // Synchronous lock: state updates are async, so a fast double-click could
  // otherwise trigger two requests before the buttons re-render as disabled.
  const busyRef = useRef(false);

  const start = (kind: Provider | "email") => {
    if (busyRef.current) return false;
    busyRef.current = true;
    setLoading(kind);
    return true;
  };

  // TODO: replace the simulated delays with real auth calls (e.g. NextAuth / Supabase / Firebase).
  const finish = (message: string, user?: UserProfile) => {
    busyRef.current = false;
    setLoading(null);
    toast.success(message);
    if (user && onLoginSuccess) {
      onLoginSuccess(user);
    }
    onOpenChange(false);
  };

  const DUMMY_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  const handleSocial = (provider: Provider) => {
    if (!start(provider)) return;
    const name = provider === "google" ? "Google User" : "Facebook User";
    setTimeout(
      () =>
        finish(`Signed in with ${provider === "google" ? "Google" : "Facebook"}`, {
          name,
          email: `${provider.toLowerCase()}user@example.com`,
          avatarUrl: DUMMY_AVATAR,
        }),
      1200
    );
  };

  const handleEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!start("email")) return;
    const formData = new FormData(e.currentTarget);
    const formName = (formData.get("name") as string)?.trim();
    const formEmail = (formData.get("email") as string)?.trim() || "alex@example.com";
    const name = formName || (mode === "login" ? "Alex Morgan" : "New User");
    setTimeout(
      () =>
        finish(
          mode === "login" ? "Welcome back!" : "Account created — welcome to Hint!",
          {
            name,
            email: formEmail,
            avatarUrl: DUMMY_AVATAR,
          }
        ),
      1200
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (loading) return; // keep open while a request is in flight
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto p-0 sm:max-w-[420px] [&>[data-slot=dialog-close]]:text-white [&>[data-slot=dialog-close]]:hover:bg-white/15 [&>[data-slot=dialog-close]]:hover:text-white">
        {/* Brand header */}
        <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-sky-700 px-6 pt-7 pb-6 text-white">
          <DialogHeader className="gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
              Hint Water
            </span>
            <DialogTitle className="text-2xl font-bold text-white">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </DialogTitle>
            <DialogDescription className="text-sky-100/90">
              {mode === "login"
                ? "Log in to track orders and manage subscriptions."
                : "Join to save 17% with Subscribe & Save."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as AuthMode)}
            className="gap-5"
          >
            <TabsList className="h-10 w-full">
              <TabsTrigger id="auth-tab-login" value="login">
                Log in
              </TabsTrigger>
              <TabsTrigger id="auth-tab-signup" value="signup">
                Sign up
              </TabsTrigger>
            </TabsList>

            {/* ---------- LOGIN ---------- */}
            <TabsContent value="login" className="grid gap-4">
              <SocialButtons mode="login" loading={loading} onSelect={handleSocial} />
              <OrDivider />
              <form onSubmit={handleEmail} className="grid gap-3.5">
                <div className="grid gap-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <IconInput
                    id="login-email"
                    name="email"
                    type="email"
                    icon={Mail01Icon}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      id="login-forgot-btn"
                      variant="link"
                      className="text-xs font-medium text-blue-900 hover:underline"
                      onClick={() => toast("Password reset link sent to your email")}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <PasswordInput id="login-password" autoComplete="current-password" />
                </div>
                <Button
                  id="login-submit-btn"
                  type="submit"
                  size="lg"
                  disabled={loading !== null}
                  aria-busy={loading === "email"}
                  className="mt-1 h-11 w-full bg-blue-950 text-white hover:bg-blue-900"
                >
                  {loading === "email" ? <Spinner className="size-5" /> : "Log in with Email"}
                </Button>
              </form>
              <p className="text-center text-sm text-muted-foreground">
                New to Hint?{" "}
                <Button
                  id="login-signup-btn"
                  variant="link"
                  className="font-semibold text-blue-900 hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create an account
                </Button>
              </p>
            </TabsContent>

            {/* ---------- SIGN UP ---------- */}
            <TabsContent value="signup" className="grid gap-4">
              <SocialButtons mode="signup" loading={loading} onSelect={handleSocial} />
              <OrDivider />
              <form onSubmit={handleEmail} className="grid gap-3.5">
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-name">Full name</Label>
                  <IconInput
                    id="signup-name"
                    name="name"
                    icon={UserIcon}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <IconInput
                    id="signup-email"
                    name="email"
                    type="email"
                    icon={Mail01Icon}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <PasswordInput id="signup-password" autoComplete="new-password" />
                  <p className="text-xs text-muted-foreground">At least 8 characters.</p>
                </div>
                <Button
                  id="signup-submit-btn"
                  type="submit"
                  size="lg"
                  disabled={loading !== null}
                  aria-busy={loading === "email"}
                  className="mt-1 h-11 w-full bg-blue-950 text-white hover:bg-blue-900"
                >
                  {loading === "email" ? <Spinner className="size-5" /> : "Sign up with Email"}
                </Button>
              </form>
              <p className="text-center text-xs text-muted-foreground">
                By signing up you agree to our{" "}
                <a href="#" className="underline underline-offset-2 hover:text-foreground">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-2 hover:text-foreground">
                  Privacy Policy
                </a>
                .
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
