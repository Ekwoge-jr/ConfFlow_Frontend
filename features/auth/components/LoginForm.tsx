"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";
import { MailIcon, EyeIcon, EyeOffIcon, SpinnerIcon } from "@/components/ui/icons";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      // Redirect to conference selector on successful sign in
      router.push("/conferences");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[474px] bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] pt-12 pb-14 px-8 sm:px-16 transition-all">
      {/* Brand Logo */}
      <div className="flex justify-center mb-10">
        <Image
          src="/logo-full.svg"
          alt="ConfFlow - Conference Management Platform"
          width={231}
          height={55}
          priority
          className="h-[55px] w-auto select-none"
        />
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0F172A] tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-[#5E6470] mt-1.5 leading-snug">
          Sign in to your account to access your conferences <br className="hidden sm:inline" />
          and manage your events.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 animate-in fade-in duration-150"
        >
          {errorMessage}
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#91949D]">
              <MailIcon className="w-5 h-5" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={isLoading}
              className="w-full h-12 pl-11 pr-4 bg-white text-sm text-[#1F2430] placeholder-[#B5B7BD] rounded-md border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] disabled:bg-slate-50 disabled:text-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
              className="w-full h-12 pl-4 pr-11 bg-white text-sm text-[#1F2430] placeholder-[#B5B7BD] rounded-md border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] disabled:bg-slate-50 disabled:text-slate-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#91949D] hover:text-[#4F46E5] focus:outline-none transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end mt-2">
            <Link
              href="/forgot-password"
              className="text-sm font-normal text-[#8983EE] hover:text-[#4F46E5] hover:underline transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="min-w-[84px] h-11 px-6 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-base font-medium transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="w-5 h-5 text-white" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

