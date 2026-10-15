"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import {
  OverviewIcon,
  UsersIcon,
  ProgramIcon,
  CampaignsIcon,
  ReportsIcon,
  SettingsIcon,
  CloseIcon,
} from "@/components/ui/icons";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
  { label: "Participants", href: "/participants", icon: UsersIcon },
  { label: "Program", href: "/programs", icon: ProgramIcon },
  { label: "Campaigns", href: "/communications", icon: CampaignsIcon },
  { label: "Reports", href: "/reports", icon: ReportsIcon },
  { label: "Data & settings", href: "/settings", icon: SettingsIcon },
];

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export function Sidebar({
  isOpen = false,
  onClose,
  userName = "John Doe",
  userRole = "Administrator",
  userInitials = "JD",
}: SidebarProps) {
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [pathname]);

  // Handle escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const navContent = (
    <nav className="space-y-1" aria-label="Main Navigation">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === "/dashboard" && pathname.startsWith("/dashboard"));
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => onClose && onClose()}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              isActive
                ? "bg-[#EDEDFC] text-[#2B277E] font-semibold"
                : "text-[#5E6470] hover:text-[#0F172A] hover:bg-slate-50 font-medium"
            }`}
          >
            <Icon
              className={`w-5 h-5 shrink-0 ${
                isActive ? "text-[#2B277E]" : "text-[#111827]"
              }`}
            />
            <span className={isActive ? "text-[#726BEA] font-semibold" : ""}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR (FIXED w-[248px]) ================= */}
      <aside className="fixed left-0 top-0 bottom-0 w-[248px] bg-white border-r border-[#E2E8F0] h-screen shrink-0 hidden md:flex flex-col justify-between py-6 px-4 z-30">
        <div>
          {/* Top: ConfFlow Brand Logo - Center Aligned */}
          <div className="flex justify-center items-center mb-8 px-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center focus:outline-none"
              title="ConfFlow Home"
            >
              <Logo variant="compact" priority />
            </Link>
          </div>

          {/* Primary Navigation */}
          {navContent}
        </div>
      </aside>

      {/* ================= MOBILE / TABLET DRAWER OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ================= MOBILE / TABLET SLIDE-OVER DRAWER ================= */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 md:hidden flex flex-col justify-between py-6 px-4 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        aria-label="Mobile Navigation"
      >
        <div>
          {/* Top Row: Close button on left/right and Center Aligned Logo */}
          <div className="relative flex items-center justify-center mb-8 px-2">
            <Link
              href="/dashboard"
              onClick={() => onClose && onClose()}
              className="inline-flex items-center justify-center focus:outline-none"
              title="ConfFlow Home"
            >
              <Logo variant="compact" priority />
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 p-1.5 rounded-lg text-[#5E6470] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          {navContent}
        </div>

        {/* Bottom Profile Display (Shown on Phone View inside Drawer) */}
        <div className="sm:hidden pt-4 border-t border-slate-100 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
            {userInitials}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-[#0F172A] leading-tight">{userName}</p>
            <p className="text-xs text-[#64748B] leading-tight mt-0.5">{userRole}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
