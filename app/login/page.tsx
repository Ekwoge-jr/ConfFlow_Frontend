import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign In - ConfFlow",
  description: "Sign in to your ConfFlow conference management account",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#EDEDFC] overflow-hidden px-4 py-8 sm:py-12">
      {/* Decorative background ambient glows from Figma design (Ellipse 2 & 3) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-[552px] h-[487px] rounded-full bg-[#AEAAF3]/50 blur-[130px] -z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 w-[552px] h-[487px] rounded-full bg-[#C8C6F7]/60 blur-[130px] -z-0"
      />

      {/* Top spacer for balanced vertical alignment */}
      <div className="w-full h-4 sm:h-8" />

      {/* Centered Login Card */}
      <div className="w-full flex justify-center z-10 my-auto">
        <LoginForm />
      </div>

      {/* Brand Watermark / Footer */}
      <footer className="z-10 mt-8 mb-2">
        <p className="text-lg font-extralight text-[#5E6470] tracking-wide select-none">
          @ConfFlow
        </p>
      </footer>
    </main>
  );
}

