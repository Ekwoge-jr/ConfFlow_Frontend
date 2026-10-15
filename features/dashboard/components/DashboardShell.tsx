"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader, ACTIVE_CONFERENCES, ActiveConferenceItem } from "./DashboardHeader";
import { DashboardView } from "./DashboardView";

export function DashboardShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<ActiveConferenceItem>(
    ACTIVE_CONFERENCES[0]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar: Fixed on desktop, slide-over drawer on tablet/phone */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userName="John Doe"
        userRole="Administrator"
        userInitials="JD"
      />

      {/* Main Content Area: offset by 248px on md+ desktop */}
      <div className="md:pl-[248px] min-h-screen flex flex-col">
        {/* Sticky Application Header with hamburger button & conference switcher */}
        <DashboardHeader
          userName="John Doe"
          userRole="Administrator"
          userInitials="JD"
          selectedConferenceId={selectedConference.id}
          onSelectConference={setSelectedConference}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Dashboard Content: Dynamically updates between populated and empty states */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1128px] mx-auto">
            <DashboardView
              conferenceId={selectedConference.id}
              conferenceName={selectedConference.name}
              userName="John Doe"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
