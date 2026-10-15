"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { HourlyAttendance } from "../types";

export interface AttendanceTrendCardProps {
  data: HourlyAttendance[];
  totalCheckIns?: number;
  isEmpty?: boolean;
}

export function AttendanceTrendCard({
  data,
  totalCheckIns = 742,
  isEmpty = false,
}: AttendanceTrendCardProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const hasData = !isEmpty && data && data.length > 0 && (totalCheckIns > 0 || data.some((d) => d.count > 0));

  // Figma exact heights for the 12 hourly columns
  const figmaHeights: Record<string, number> = {
    "8:00": 30,
    "9:00": 50,
    "10:00": 70,
    "11:00": 88,
    "12:00": 78,
    "13:00": 104,
    "14:00": 118,
    "15:00": 108,
    "16:00": 126,
    "17:00": 114,
    "18:00": 136,
    "19:00": 128,
  };

  return (
    <Card className="p-6 h-[286px] flex flex-col justify-between border-[#E2E8F0] overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A] tracking-tight">
            Attendance trend
          </h3>
          <p className="text-xs text-[#91949D] mt-0.5">Hourly check-ins · Today</p>
        </div>
        <span className="text-sm font-semibold text-[#4F46E5]">{hasData ? totalCheckIns : 0} total</span>
      </div>

      {/* Hourly Bar Chart Area OR Center-Aligned Default Empty State */}
      {hasData ? (
        <div className="h-[180px] w-full flex items-end justify-between gap-1.5 sm:gap-2 pt-2">
          {data.map((item, index) => {
            const targetHeight = figmaHeights[item.hour] ?? Math.round((item.count / 200) * 140);
            const isPeakHour = item.isPeak || item.hour === "18:00" || item.hour === "19:00";
            const barBg = isPeakHour ? "bg-[#2B277E]" : "bg-[#EDEDFC]";

            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-semibold py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 shadow-xs">
                  {item.count} check-ins
                </div>

                {/* Animated Bar */}
                <div
                  style={{
                    height: animate ? `${targetHeight}px` : "0px",
                    transition: `height 650ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`,
                  }}
                  className={`w-full max-w-[46px] rounded-t-[2px] transform origin-bottom group-hover:brightness-95 group-hover:scale-y-[1.02] ${barBg}`}
                  title={`${item.hour}: ${item.count} check-ins`}
                />
                {/* Hour Label */}
                <span className="text-[11px] font-medium text-[#B5B7BD] truncate">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        /* Default Empty State with Center-Aligned Sticker */
        <div className="h-[180px] flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-300">
          {/* Timeline / Check-in Sticker */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EDEDFC] via-[#EEF2FF] to-[#E0E7FF] p-3 shadow-xs border-2 border-white ring-1 ring-slate-200/60 rotate-[-4deg] hover:rotate-0 transition-transform duration-200 flex items-center justify-center mb-2.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="#4F46E5" strokeWidth="2" />
              <polyline points="12 7 12 12 15 15" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
              <circle cx="19" cy="5" r="1.5" fill="#10B981" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#0F172A]">No check-ins recorded yet</p>
          <p className="text-xs text-[#64748B] mt-0.5 max-w-[240px] leading-relaxed">
            Hourly check-in trends will appear here as attendees scan badges.
          </p>
        </div>
      )}
    </Card>
  );
}
