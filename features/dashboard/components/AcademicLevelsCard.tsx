"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { AcademicDistribution } from "../types";

export interface AcademicLevelsCardProps {
  distribution?: AcademicDistribution;
  isEmpty?: boolean;
}

export function AcademicLevelsCard({
  distribution,
  isEmpty = false,
}: AcademicLevelsCardProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const total = distribution
    ? (distribution.bachelors || 0) + (distribution.masters || 0) + (distribution.others || 0)
    : 0;

  const hasData = !isEmpty && distribution && total > 0;

  // Histogram calculation: adjacent bins with heights proportional to data frequency
  const maxVal = Math.max(
    distribution?.bachelors || 0,
    distribution?.masters || 0,
    distribution?.others || 0,
    1
  );

  const maxHeightPx = 46;
  const bHeight = Math.max(Math.round(((distribution?.bachelors || 0) / maxVal) * maxHeightPx), 6);
  const mHeight = Math.max(Math.round(((distribution?.masters || 0) / maxVal) * maxHeightPx), 6);
  const oHeight = Math.max(Math.round(((distribution?.others || 0) / maxVal) * maxHeightPx), 6);

  return (
    <Card className="p-6 h-[146px] flex flex-col justify-between border-[#E2E8F0] overflow-hidden">
      {hasData ? (
        <>
          <p className="text-sm font-medium text-[#5E6470]">Academic levels</p>

          {/* Histogram Chart: adjacent contiguous bins with heights reflecting distribution */}
          <div className="w-full max-w-[420px] self-end sm:self-center">
            <div className="grid grid-cols-3 gap-0 items-end">
              {/* Bachelors Bin */}
              <div className="flex flex-col items-center justify-end group relative">
                <span className="text-xs font-medium text-[#5E6470] mb-2 truncate">
                  Bachelors
                </span>
                {/* Tooltip */}
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-semibold py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 shadow-xs">
                  {distribution?.bachelors}% Bachelors
                </div>
                <div
                  style={{
                    height: animate ? `${bHeight}px` : "0px",
                    transition: "height 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="w-full bg-[#C8C6F7] rounded-l-md transform origin-bottom group-hover:brightness-95 transition-all"
                  title={`Bachelors: ${distribution?.bachelors}%`}
                />
              </div>

              {/* Masters Bin */}
              <div className="flex flex-col items-center justify-end group relative">
                <span className="text-xs font-medium text-[#5E6470] mb-2 truncate">
                  Masters
                </span>
                {/* Tooltip */}
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-semibold py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 shadow-xs">
                  {distribution?.masters}% Masters
                </div>
                <div
                  style={{
                    height: animate ? `${mHeight}px` : "0px",
                    transition: "height 600ms cubic-bezier(0.16, 1, 0.3, 1) 50ms",
                  }}
                  className="w-full bg-[#4F46E5] transform origin-bottom group-hover:brightness-95 transition-all"
                  title={`Masters: ${distribution?.masters}%`}
                />
              </div>

              {/* Others Bin */}
              <div className="flex flex-col items-center justify-end group relative">
                <span className="text-xs font-medium text-[#5E6470] mb-2 truncate">
                  Others
                </span>
                {/* Tooltip */}
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F172A] text-white text-[10px] font-semibold py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10 shadow-xs">
                  {distribution?.others}% Others
                </div>
                <div
                  style={{
                    height: animate ? `${oHeight}px` : "0px",
                    transition: "height 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
                  }}
                  className="w-full bg-[#2B277E] rounded-r-md transform origin-bottom group-hover:brightness-95 transition-all"
                  title={`Others: ${distribution?.others}%`}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Default / Empty State with Center-Aligned Sticker */
        <div className="h-full flex flex-col items-center justify-center text-center select-none animate-in fade-in duration-300">
          {/* Graduation Cap / Education Sticker */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EDEDFC] via-[#EEF2FF] to-[#E0E7FF] p-2 shadow-xs border-2 border-white ring-1 ring-slate-200/60 rotate-[-4deg] hover:rotate-0 transition-transform duration-200 flex items-center justify-center mb-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="#4F46E5" />
              <path
                d="M5 13.18V17.18C5 19.39 8.13 21.18 12 21.18C15.87 21.18 19 19.39 19 17.18V13.18L12 17L5 13.18Z"
                fill="#2B277E"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold text-[#0F172A]">No academic data yet</p>
          <p className="text-[11px] text-[#64748B] mt-0.5 max-w-[220px] leading-tight">
            Histogram distribution will appear as participants register.
          </p>
        </div>
      )}
    </Card>
  );
}
