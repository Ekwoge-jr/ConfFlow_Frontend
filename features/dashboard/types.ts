export interface KpiMetric {
  title: string;
  value: string;
  detail: string;
  changePositive?: boolean;
}

export interface CompactMetric {
  label: string;
  value: string;
  change: string;
}

export interface HourlyAttendance {
  hour: string;
  count: number;
  isPeak?: boolean;
}

export interface OperationalAlert {
  id: string;
  type: "warning" | "error" | "info";
  title: string;
  detail: string;
}

export interface RecentActivityItem {
  id: string;
  participantName: string;
  participantInitials: string;
  activity: string;
  type: "VIP" | "Speaker" | "Attendee";
  time: string;
}

export interface AcademicDistribution {
  bachelors: number; // percentage
  masters: number;
  others: number;
}

