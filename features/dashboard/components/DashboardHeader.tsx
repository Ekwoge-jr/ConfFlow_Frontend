"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, CheckIcon, MenuIcon } from "@/components/ui/icons";

export interface ActiveConferenceItem {
  id: string;
  name: string;
  year: string;
  status: "active" | "upcoming";
  location: string;
}

export const ACTIVE_CONFERENCES: ActiveConferenceItem[] = [
  {
    id: "dsa-2027",
    name: "Data Science Africa",
    year: "2027",
    status: "active",
    location: "Yaounde, Cameroon",
  },
  {
    id: "aiss-2027",
    name: "AI Summer School",
    year: "2027",
    status: "upcoming",
    location: "Nairobi, Kenya",
  },
  {
    id: "his-2027",
    name: "Health Informatics Symposium",
    year: "2027",
    status: "upcoming",
    location: "Kigali, Rwanda",
  },
];

export interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
  selectedConferenceId?: string;
  onSelectConference?: (conf: ActiveConferenceItem) => void;
  onOpenMobileMenu?: () => void;
}

export function DashboardHeader({
  userName = "John Doe",
  userRole = "Administrator",
  userInitials = "JD",
  selectedConferenceId = "dsa-2027",
  onSelectConference,
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  const [internalSelected, setInternalSelected] = useState<ActiveConferenceItem>(
    ACTIVE_CONFERENCES.find((c) => c.id === selectedConferenceId) || ACTIVE_CONFERENCES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConf =
    ACTIVE_CONFERENCES.find((c) => c.id === selectedConferenceId) || internalSelected;

  // Close dropdown on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleSelect = (conf: ActiveConferenceItem) => {
    setInternalSelected(conf);
    if (onSelectConference) {
      onSelectConference(conf);
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full h-[76px] px-4 sm:px-8 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0 sticky top-0 z-20">
      {/* Left Area: Hamburger button (tablet/mobile) + Conference Switcher */}
      <div className="flex items-center gap-3">
        {/* Hamburger Icon button for Tablet & Phone View (< md) */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 -ml-1 rounded-xl text-[#2B277E] hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Open navigation menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {/* Conference Switcher Pill with Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#EDEDFC] hover:bg-[#E0E0FB] text-[#2B277E] text-xs sm:text-sm font-semibold transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            title="Switch conference"
          >
            <span className="truncate max-w-[160px] sm:max-w-none">
              {activeConf.name} · {activeConf.year}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 text-[#2B277E] transition-transform duration-200 shrink-0 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              role="listbox"
            >
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-[#5E6470] uppercase tracking-wider">
                  Select Active Conference
                </p>
              </div>

              <div className="py-1 space-y-1">
                {ACTIVE_CONFERENCES.map((conf) => {
                  const isSelected = conf.id === activeConf.id;
                  return (
                    <button
                      key={conf.id}
                      type="button"
                      onClick={() => handleSelect(conf)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#EDEDFC] text-[#2B277E] font-semibold"
                          : "text-[#0F172A] hover:bg-slate-50 font-medium"
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div>
                        <p className="leading-tight">{conf.name}</p>
                        <p className="text-xs text-[#5E6470] mt-0.5">
                          {conf.location} · {conf.year}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckIcon className="w-4 h-4 text-[#4F46E5] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer link to manage all conferences */}
              <div className="pt-2 border-t border-slate-100 px-1">
                <Link
                  href="/conferences"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-center block py-1.5 text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
                >
                  Manage all conferences →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Account Actions / User Profile */}
      <div className="hidden sm:flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm shrink-0 select-none shadow-2xs">
          {userInitials}
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-[#0F172A] leading-tight">{userName}</p>
          <p className="text-xs text-[#64748B] leading-tight mt-0.5">{userRole}</p>
        </div>
      </div>
    </header>
  );
}
