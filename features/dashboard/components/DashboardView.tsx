"use client";

import React, { useState, useEffect } from "react";
import { KpiCard } from "./KpiCard";
import { CompactMetricCard } from "./CompactMetricCard";
import { AcademicLevelsCard } from "./AcademicLevelsCard";
import { AttendanceTrendCard } from "./AttendanceTrendCard";
import { OperationalAlertsCard } from "./OperationalAlertsCard";
import { RecentActivityTable } from "./RecentActivityTable";
import { dashboardService } from "../services/dashboard.service";

export interface DashboardViewProps {
  conferenceId?: string;
  conferenceName?: string;
  userName?: string;
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function DashboardView({
  conferenceId = "dsa-2027",
  conferenceName = "Data Science Africa",
  userName = "John Doe",
}: DashboardViewProps) {
  const data = dashboardService.getConferenceData(conferenceId);
  const [greeting, setGreeting] = useState<string>("Good morning");

  useEffect(() => {
    setGreeting(getTimeGreeting());
  }, []);

  const firstName = userName ? userName.trim().split(" ")[0] : "John";

  return (
    <div className="space-y-6">
      {/* Page Heading with Dynamic Time-of-Day Greeting */}
      <div>
        <h1
          suppressHydrationWarning
          className="text-[30px] font-bold text-[#3F4555] tracking-tight leading-tight"
        >
          {greeting}, {firstName}
        </h1>
        <p className="text-sm text-[#5E6470] mt-1">
          Here’s what’s happening at {conferenceName} today.
        </p>
      </div>

      {/* Top Metrics Section (Figma KPI cards 1128x310) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Left Column (556px): 2x2 Grid of Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.kpis.map((kpi) => (
            <KpiCard key={kpi.title} metric={kpi} isEmpty={!data.hasData} />
          ))}
        </div>

        {/* Right Column (556px): 4 Compact Demographic Cards + Academic Levels Histogram */}
        <div className="flex flex-col gap-4">
          {/* Top Row: 4 Demographic Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {data.compactMetrics.map((metric) => (
              <CompactMetricCard key={metric.label} metric={metric} isEmpty={!data.hasData} />
            ))}
          </div>

          {/* Bottom Row: Academic Levels Histogram Card */}
          <AcademicLevelsCard
            distribution={data.academicDistribution}
            isEmpty={!data.hasData}
          />
        </div>
      </div>

      {/* Analytics Row (Figma Analytics row 1128x286) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Attendance Trend Chart (~70% width / 766px) */}
        <div className="xl:col-span-8">
          <AttendanceTrendCard
            data={data.attendanceTrend}
            totalCheckIns={data.hasData ? 742 : 0}
            isEmpty={!data.hasData}
          />
        </div>

        {/* Right: Operational Alerts Panel (~30% width / 330px) */}
        <div className="xl:col-span-4">
          <OperationalAlertsCard initialAlerts={data.alerts} />
        </div>
      </div>

      {/* Bottom Section: Recent Activity Feed (Figma Recent activity 1128px) */}
      <div>
        <RecentActivityTable
          activities={data.recentActivity}
          isEmpty={!data.hasData}
        />
      </div>
    </div>
  );
}
