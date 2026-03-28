"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Loader2, Mail } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function signInWithGithub() {
    startGithubTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed in with Github!");
              router.push("/");
            },
            onError: (err: any) => {
              toast.error(err?.error?.message || "Failed to sign in with Github");
            },
          },
        });
      } catch (error: any) {
        toast.error("Failed to sign in with Github");
      }
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: () => {
              toast.success("Signed in with Google!");
              router.push("/");
            },
            onError: (err: any) => {
              toast.error(err?.error?.message || "Failed to sign in with Google");
            },
          },
        });
      } catch (error: any) {
        toast.error("Failed to sign in with Google");
      }
    });
  }

  async function handleEmailAuth() {
    // Validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    startEmailTransition(async () => {
      try {
        if (isSignUp) {
          // Sign up
          const response = await authClient.signUp.email({
            email: email.trim().toLowerCase(),
            password,
            name: email.split("@")[0],
          });

          if (response.error) {
            toast.error(response.error?.message || "Failed to create account");
            return;
          }

          toast.success("Account created successfully!");
          router.push("/");
        } else {
          // Sign in
          const response = await authClient.signIn.email({
            email: email.trim().toLowerCase(),
            password,
          });

          if (response.error) {
            toast.error(response.error?.message || "Invalid email or password");
            return;
          }

          toast.success("Signed in successfully!");
          router.push("/");
        }
      } catch (error: any) {
        toast.error(error?.message || "An error occurred");
      }
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isSignUp ? "Create Account" : "Welcome back!"}
        </CardTitle>
        <CardDescription>
          {isSignUp
            ? "Sign up to start learning"
            : "Login to your account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Social Login Buttons */}
        <Button
          disabled={githubPending || googlePending || emailPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>

        <Button
          disabled={githubPending || googlePending || emailPending}
          onClick={signInWithGoogle}
          className="w-full"
          variant="outline"
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Mail className="size-4" />
              Sign in with Google
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>

        {/* Email and Password Form */}
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="you@gmail.com"
              disabled={emailPending || githubPending || googlePending}
              autoComplete="email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={emailPending || githubPending || googlePending}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !emailPending) {
                  handleEmailAuth();
                }
              }}
            />
          </div>

          <Button
            onClick={handleEmailAuth}
            disabled={emailPending || githubPending || googlePending}
            className="w-full"
          >
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>
                {isSignUp ? "Create Account" : "Sign In"}
              </span>
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setEmail("");
                  setPassword("");
                }}
                className="text-primary hover:underline font-medium"
                disabled={emailPending || githubPending || googlePending}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setEmail("");
                  setPassword("");
                }}
                className="text-primary hover:underline font-medium"
                disabled={emailPending || githubPending || googlePending}
              >
                Create one
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
