"use client";

import React from "react";
import Link from "next/link";
import { Conference } from "../types";
import { Card, Logo, Badge, CalendarIcon, LocationPinIcon } from "@/components/ui";

export interface ConferenceCardProps {
  conference: Conference;
}

export function ConferenceCard({ conference }: ConferenceCardProps) {
  const statusBadgeVariant = {
    active: "success",
    upcoming: "primary",
    archived: "neutral",
  }[conference.status] as "success" | "primary" | "neutral";

  return (
    <Link
      href="/dashboard"
      className="group block focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/40 rounded-2xl pt-10"
    >
      <Card className="relative pt-0 pb-6 px-6 transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:border-[#4F46E5]/40 text-center">
        {/* Status Badge in top-right */}
        <div className="absolute top-4 right-4">
          <Badge variant={statusBadgeVariant}>
            {conference.status.charAt(0).toUpperCase() + conference.status.slice(1)}
          </Badge>
        </div>

        {/* Protruding Top Logo Badge (matching Figma Ellipse 15: 79x79px with logo mark) */}
        <div className="-mt-10 mx-auto w-[76px] h-[76px] rounded-full bg-[#EDEDFC] border-4 border-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
          <Logo variant="mark" size={38} />
        </div>

        {/* Conference Title & Acronym */}
        <div className="mt-3.5 mb-4">
          <h3 className="text-lg font-bold text-[#2B277E] tracking-tight group-hover:text-[#4F46E5] transition-colors truncate">
            {conference.name}
          </h3>
          <p className="text-xs font-medium text-[#5E6470] mt-0.5">
            {conference.acronym}
          </p>
        </div>

        {/* Details list (Date and Location with purple icons matching Figma) */}
        <div className="space-y-2 border-t border-slate-100 pt-4 text-left">
          <div className="flex items-center gap-2.5 text-sm font-medium text-[#5E6470]">
            <CalendarIcon className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span className="truncate">{conference.formattedDate}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm font-medium text-[#5E6470]">
            <LocationPinIcon className="w-4 h-4 text-[#4F46E5] shrink-0" />
            <span className="truncate">
              {conference.city}
              {conference.country ? `, ${conference.country}` : ""}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

