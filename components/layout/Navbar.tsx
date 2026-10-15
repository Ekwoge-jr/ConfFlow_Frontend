"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui";
import { SignOutIcon } from "@/components/ui/icons";
import { authService } from "@/features/auth";

export interface NavbarProps {
  userName?: string;
  userInitials?: string;
}

export function Navbar({ userName = "John Doe", userInitials = "JD" }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    authService.logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-[#E2E8F0]/80 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Left: ConfFlow Compact Brand Logo */}
        <Link href="/conferences" className="flex items-center gap-2 focus:outline-none">
          <Logo variant="compact" priority />
        </Link>

        {/* Right: User Profile (matching Figma Group 4703) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
            aria-expanded={isMenuOpen}
            aria-label="User menu"
          >
            {/* Avatar Circle with initials (Frame in Figma: 40x40, fill #4F46E5, white text) */}
            <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm select-none shadow-xs">
              {userInitials}
            </div>
            <span className="text-sm font-medium text-[#0F172A] hidden sm:inline-block pr-1">
              {userName}
            </span>
          </button>

          {/* User dropdown menu */}
          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-[#E2E8F0] shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
              role="menu"
            >
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="text-sm font-semibold text-[#0F172A] truncate">{userName}</p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                role="menuitem"
              >
                <SignOutIcon className="w-4 h-4 text-red-500" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

