"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { CloseIcon } from "@/components/ui/icons";
import { OperationalAlert } from "../types";

export interface OperationalAlertsCardProps {
  initialAlerts: OperationalAlert[];
}

export function OperationalAlertsCard({ initialAlerts }: OperationalAlertsCardProps) {
  const [alerts, setAlerts] = useState<OperationalAlert[]>(initialAlerts);

  const handleDismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const alertStyles = {
    warning: {
      card: "bg-[#FBF1E6] border-[#EEC08C]",
      icon: "text-[#E6A458] hover:text-[#C57A27]",
    },
    error: {
      card: "bg-[#FCE9E9] border-[#DC2626]",
      icon: "text-[#DC2626] hover:text-[#B91C1C]",
    },
    info: {
      card: "bg-[#E6F3F9] border-[#0284C7]",
      icon: "text-[#0284C7] hover:text-[#0369A1]",
    },
  };

  return (
    <Card className="p-6 h-[286px] flex flex-col justify-start border-[#E2E8F0] overflow-hidden">
      {/* Header with Title and Superscript Badge at the letter 's' */}
      <div className="flex items-center mb-5">
        <h3 className="text-lg font-semibold text-[#0F172A] tracking-tight inline-flex items-center select-none">
          <span>Operational alert</span>
          <span className="relative inline-block">
            s
            {alerts.length > 0 && (
              <span
                className="absolute -top-2 left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-xs pointer-events-none"
                aria-label={`${alerts.length} active alerts`}
              >
                {alerts.length}
              </span>
            )}
          </span>
        </h3>
      </div>

      {/* Alerts Stack or Empty State Sticker */}
      <div className="space-y-3 w-full">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const style = alertStyles[alert.type];

            return (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${style.card}`}
              >
                <div className="pr-2 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] leading-tight truncate">
                    {alert.title}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-snug truncate">
                    {alert.detail}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDismiss(alert.id)}
                  className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${style.icon}`}
                  aria-label={`Dismiss ${alert.title}`}
                >
                  <CloseIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        ) : (
          /* Empty Alert State with Center-Aligned Sticker */
          <div className="flex flex-col items-center justify-center py-5 text-center select-none animate-in fade-in duration-300">
            {/* Illustrated Celebration / All-Clear Sticker */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#EDEDFC] via-[#EEF2FF] to-[#DCFCE7] p-2.5 shadow-sm border-2 border-white ring-1 ring-slate-200/60 rotate-[-4deg] hover:rotate-0 transition-transform duration-200 flex items-center justify-center mb-2.5">
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8" aria-hidden="true">
                <circle cx="18" cy="18" r="14" fill="#16A34A" fillOpacity="0.12" />
                <path
                  d="M11 18.5L15.5 23L25 13.5"
                  stroke="#16A34A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="26" cy="9" r="1.5" fill="#4F46E5" />
                <circle cx="8" cy="26" r="1" fill="#F59E0B" />
              </svg>
            </div>

            <p className="text-sm font-semibold text-[#0F172A]">All clear!</p>
            <p className="text-xs text-[#64748B] mt-0.5 max-w-[210px] leading-relaxed">
              No active operational alerts for this conference.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
