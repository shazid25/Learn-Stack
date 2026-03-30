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
import { GithubIcon, Loader, Loader2, Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isLoading = githubPending || googlePending || emailPending;

  async function getRedirectUrl() {
    try {
      const session = await authClient.getSession();
      if (session?.data?.user?.role === "admin") {
        return "/admin";
      }
      return "/";
    } catch {
      return "/";
    }
  }

  async function signInWithGithub() {
    startGithubTransition(async () => {
      try {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
          fetchOptions: {
            onSuccess: async () => {
              toast.success("Signed in with Github!");
              const redirectUrl = await getRedirectUrl();
              router.push(redirectUrl);
            },
            onError: (err: { error?: { message?: string } }) => {
              toast.error(err?.error?.message || "Failed to sign in with Github");
            },
          },
        });
      } catch {
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
            onSuccess: async () => {
              toast.success("Signed in with Google!");
              const redirectUrl = await getRedirectUrl();
              router.push(redirectUrl);
            },
            onError: (err: { error?: { message?: string } }) => {
              toast.error(err?.error?.message || "Failed to sign in with Google");
            },
          },
        });
      } catch {
        toast.error("Failed to sign in with Google");
      }
    });
  }

  async function handleEmailAuth() {
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!email.trim()) {
      setEmailError("Please enter your email");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
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
          const redirectUrl = await getRedirectUrl();
          router.push(redirectUrl);
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
          const redirectUrl = await getRedirectUrl();
          router.push(redirectUrl);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isSignUp ? "Create Account" : "Welcome Back!"}
          </CardTitle>
          <CardDescription className="text-base">
            {isSignUp
              ? "Join our learning community today"
              : "Sign in to your learning journey"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              disabled={isLoading}
              onClick={signInWithGithub}
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {githubPending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <GithubIcon className="size-5" />
                  Continue with Github
                </>
              )}
            </Button>

            <Button
              disabled={isLoading}
              onClick={signInWithGoogle}
              className="w-full h-11 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {googlePending ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Mail className="size-5" />
                  Continue with Google
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600 font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email and Password Form */}
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className={`h-11 rounded-lg font-medium transition-all duration-200 ${
                    emailError
                      ? "border-2 border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  }`}
                  autoComplete="email"
                />
                {emailError && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-red-500" />
                )}
              </div>
              {emailError && (
                <p className="text-xs text-red-500 font-medium">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`h-11 rounded-lg font-medium transition-all duration-200 pr-10 ${
                    passwordError
                      ? "border-2 border-red-500 focus:ring-red-100"
                      : "border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  }`}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isLoading) {
                      handleEmailAuth();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 font-medium">{passwordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleEmailAuth}
              disabled={isLoading}
              className="w-full h-11 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 mt-2"
            >
              {emailPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>{isSignUp ? "Creating..." : "Signing in..."}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5" />
                  <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                </>
              )}
            </Button>
          </div>

          {/* Toggle Sign In / Sign Up */}
          <div className="text-center text-sm">
            {isSignUp ? (
              <div className="space-y-2">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setEmail("");
                      setPassword("");
                      setEmailError("");
                      setPasswordError("");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                    disabled={isLoading}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setEmail("");
                      setPassword("");
                      setEmailError("");
                      setPasswordError("");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                    disabled={isLoading}
                  >
                    Create one
                  </button>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
