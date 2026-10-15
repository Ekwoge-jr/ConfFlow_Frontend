import React from "react";
import Image from "next/image";

export interface LogoProps {
  variant?: "full" | "compact" | "mark";
  className?: string;
  priority?: boolean;
  size?: number;
}

export function Logo({
  variant = "full",
  className = "",
  priority = false,
  size,
}: LogoProps) {
  if (variant === "mark") {
    const dimension = size || 32;
    return (
      <Image
        src="/logo-mark.svg"
        alt="ConfFlow Mark"
        width={dimension}
        height={dimension}
        priority={priority}
        className={`h-auto w-auto select-none ${className}`}
      />
    );
  }

  if (variant === "compact") {
    return (
      <Image
        src="/logo-compact.svg"
        alt="ConfFlow"
        width={135}
        height={30}
        priority={priority}
        className={`h-7 w-auto select-none ${className}`}
      />
    );
  }

  // Default "full" logo
  return (
    <Image
      src="/logo-full.svg"
      alt="ConfFlow - Conference Management Platform"
      width={231}
      height={55}
      priority={priority}
      className={`h-[55px] w-auto select-none ${className}`}
    />
  );
}
