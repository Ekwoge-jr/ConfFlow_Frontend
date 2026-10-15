import React from "react";
import { Card } from "@/components/ui/Card";
import { KpiMetric } from "../types";

export interface KpiCardProps {
  metric: KpiMetric;
  isEmpty?: boolean;
}

export function KpiCard({ metric, isEmpty = false }: KpiCardProps) {
  const hasData = !isEmpty && metric && metric.value && metric.value !== "—" && metric.value !== "0";

  return (
    <Card className="p-6 h-[146px] flex items-center justify-between border-[#E2E8F0]">
      {/* Content Stack */}
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium text-[#5E6470] leading-tight">{metric.title}</p>
        <p className="text-[32px] font-bold text-[#0F172A] tracking-tight leading-none mt-1.5">
          {hasData ? metric.value : "—"}
        </p>
        <p
          className={`text-xs font-semibold mt-1.5 ${
            hasData ? "text-[#16A34A]" : "text-[#91949D]"
          }`}
        >
          {hasData ? metric.detail : "No data recorded"}
        </p>
      </div>

      {/* Sparkline Trend (Green when active, muted dashed line when default empty) */}
      <div className="w-[71px] h-[34px] shrink-0 self-center">
        <svg
          viewBox="0 0 71 34"
          fill="none"
          className={`w-full h-full ${hasData ? "text-[#16A34A]" : "text-[#CBD5E1]"}`}
          aria-hidden="true"
        >
          <path
            d="M 2 24 L 16 18 L 26 22 L 38 12 L 48 16 L 68 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={hasData ? undefined : "4 4"}
          />
        </svg>
      </div>
    </Card>
  );
}
