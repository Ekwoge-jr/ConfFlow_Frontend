import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { RecentActivityItem } from "../types";

export interface RecentActivityTableProps {
  activities?: RecentActivityItem[];
  isEmpty?: boolean;
}

export function RecentActivityTable({
  activities = [],
  isEmpty = false,
}: RecentActivityTableProps) {
  const hasData = !isEmpty && activities && activities.length > 0;
  const isScrollable = activities.length > 5;

  return (
    <Card className="border-[#E2E8F0] overflow-hidden">
      {/* Header */}
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] tracking-tight">
            Recent activity
          </h3>
          <p className="text-xs text-[#5E6470] mt-0.5">
            Latest participant and registration updates
          </p>
        </div>
        {hasData && (
          <Link
            href="/participants"
            className="text-xs font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
          >
            View all activity
          </Link>
        )}
      </div>

      {/* Table Content (Scrollable when activities > 5) OR Center-Aligned Default Empty State */}
      {hasData ? (
        <div
          className={`overflow-x-auto ${
            isScrollable
              ? "max-h-[310px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#CBD5E1_transparent]"
              : ""
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead className={isScrollable ? "sticky top-0 z-10 bg-[#F1F5F9]" : ""}>
              <tr className="bg-[#F1F5F9] border-b border-[#E2E8F0]">
                <th className="py-3 px-6 text-[11px] font-semibold text-[#5E6470] uppercase tracking-wider w-[260px]">
                  Participant
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[#5E6470] uppercase tracking-wider">
                  Activity
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[#5E6470] uppercase tracking-wider w-[140px]">
                  Type
                </th>
                <th className="py-3 px-6 text-[11px] font-semibold text-[#5E6470] uppercase tracking-wider text-right w-[110px]">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {activities.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Participant */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EDEDFC] text-[#4F46E5] flex items-center justify-center font-bold text-xs shrink-0 select-none">
                        {item.participantInitials}
                      </div>
                      <span className="font-semibold text-sm text-[#0F172A] truncate">
                        {item.participantName}
                      </span>
                    </div>
                  </td>

                  {/* Activity */}
                  <td className="py-3.5 px-6 text-[#5E6470] text-sm">
                    {item.activity}
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-6">
                    <span className="font-semibold text-xs text-[#4F46E5]">
                      {item.type}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-6 text-xs text-[#91949D] text-right whitespace-nowrap">
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Center-Aligned Default Empty State with Sticker */
        <div className="py-12 flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-300">
          {/* Activity / Users Sticker */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EDEDFC] via-[#EEF2FF] to-[#E0E7FF] p-3 shadow-xs border-2 border-white ring-1 ring-slate-200/60 rotate-[-4deg] hover:rotate-0 transition-transform duration-200 flex items-center justify-center mb-2.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="7" r="4" stroke="#4F46E5" strokeWidth="2" />
              <path
                d="M22 21v-2a4 4 0 0 0-3-3.87"
                stroke="#2B277E"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
                stroke="#2B277E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#0F172A]">No recent activity</p>
          <p className="text-xs text-[#64748B] mt-0.5 max-w-[260px] leading-relaxed">
            Participant registrations, badge prints, and check-in updates will show up here.
          </p>
        </div>
      )}
    </Card>
  );
}
