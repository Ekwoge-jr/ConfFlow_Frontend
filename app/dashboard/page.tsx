import type { Metadata } from "next";
import { DashboardShell } from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard - ConfFlow",
  description: "Executive and operational conference command center",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
