import React from "react";
import { Card } from "@/components/ui/Card";
import { CompactMetric } from "../types";

export interface CompactMetricCardProps {
  metric: CompactMetric;
  isEmpty?: boolean;
}

export function CompactMetricCard({ metric, isEmpty = false }: CompactMetricCardProps) {
  const hasData = !isEmpty && metric && metric.value && metric.value !== "—" && metric.value !== "0";

  return (
    <Card className="isolate relative overflow-hidden p-6 h-[146px] flex flex-col items-center justify-start text-center border-[#E2E8F0]">
      {/* Content Stack */}
      <div className="relative z-1 flex flex-col items-center">
        <p className="text-sm font-medium text-[#5E6470]">{metric.label}</p>
        <p className="text-[26px] font-bold text-[#0F172A] tracking-tight leading-none mt-2">
          {hasData ? metric.value : "—"}
        </p>
        <p
          className={`text-xs font-semibold mt-2 ${
            hasData ? "text-[#16A34A]" : "text-[#91949D]"
          }`}
        >
          {hasData ? metric.change : "No data"}
        </p>
      </div>

      {/* Soft Wave Graphic at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-9 pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`wave-gradient-${metric.label}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop
                offset="0%"
                stopColor={hasData ? "#16A34A" : "#94A3B8"}
                stopOpacity={hasData ? 0.18 : 0.08}
              />
              <stop
                offset="100%"
                stopColor={hasData ? "#0284C7" : "#CBD5E1"}
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <path
            d="M 0 20 C 20 10, 35 25, 55 12 C 75 0, 88 15, 100 8 L 100 30 L 0 30 Z"
            fill={`url(#wave-gradient-${metric.label})`}
          />
        </svg>
      </div>
    </Card>
  );
}
