"use client";

import React, { forwardRef } from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightElement,
      id,
      className = "",
      containerClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[#0F172A] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#91949D]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            className={`w-full h-12 bg-white text-sm text-[#1F2430] placeholder-[#B5B7BD] rounded-md border transition-all focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden ${
              leftIcon ? "pl-11" : "pl-4"
            } ${rightElement ? "pr-11" : "pr-4"} ${
              error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/20"
            } ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-600 animate-in fade-in duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
