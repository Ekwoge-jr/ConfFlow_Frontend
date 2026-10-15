import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ConferenceList } from "@/features/conferences";

export const metadata: Metadata = {
  title: "Conferences - ConfFlow",
  description: "Select and manage your assigned conferences",
};

export default function ConferencesPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] flex flex-col overflow-x-hidden">
      {/* Signature atmospheric ambient background orbs matching Figma design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-[552px] h-[487px] rounded-full bg-[#AEAAF3]/40 blur-[140px] -z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-[552px] h-[487px] rounded-full bg-[#C8C6F7]/50 blur-[140px] -z-0"
      />

      {/* Top Navbar */}
      <Navbar userName="John Doe" userInitials="JD" />

      {/* Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 z-10">
        {/* Header Section (matching Figma 2216:1413) */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0F172A] tracking-tight">
            Conferences
          </h1>
          <p className="text-sm text-[#5E6470] mt-2">
            Manage your conferences
          </p>
        </div>

        {/* Conference Controls & Grid */}
        <ConferenceList />
      </main>
    </div>
  );
}

