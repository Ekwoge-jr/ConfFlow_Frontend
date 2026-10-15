import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "primary" | "warning" | "neutral";
  children: React.ReactNode;
}

export function Badge({ variant = "neutral", children, className = "", ...props }: BadgeProps) {
  const variantStyles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    primary: "bg-[#EDEDFC] text-[#4F46E5] border-[#D5D5F9]",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-50 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

