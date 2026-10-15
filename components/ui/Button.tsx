"use client";

import React, { forwardRef } from "react";
import { SpinnerIcon } from "./icons";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles matching Figma design (rounded-lg, font-medium, smooth transitions)
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none";

    // Size variants (Figma uses 44px / h-11 for primary actions)
    const sizeStyles = {
      sm: "h-9 px-3.5 text-sm rounded-md gap-1.5",
      md: "min-w-[84px] h-11 px-6 text-base rounded-lg gap-2",
      lg: "h-12 px-8 text-base rounded-lg gap-2.5",
    };

    // Color variants based on ConfFlow design system
    const variantStyles = {
      primary:
        "bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white shadow-sm focus:ring-[#4F46E5]/40",
      secondary:
        "bg-[#EDEDFC] hover:bg-[#E0E0FB] active:bg-[#D5D5F9] text-[#2B277E] focus:ring-[#4F46E5]/30",
      outline:
        "border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#1F2430] focus:ring-[#4F46E5]/30",
      ghost:
        "bg-transparent hover:bg-slate-100 text-[#5E6470] hover:text-[#1F2430] focus:ring-slate-300",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && <SpinnerIcon className="w-5 h-5 text-current animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

