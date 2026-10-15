import {
  KpiMetric,
  CompactMetric,
  HourlyAttendance,
  OperationalAlert,
  RecentActivityItem,
  AcademicDistribution,
} from "../types";

export const dashboardService = {
  getKpis(): KpiMetric[] {
    return [
      {
        title: "Registered",
        value: "1,248",
        detail: "+86 this week",
        changePositive: true,
      },
      {
        title: "Confirmed",
        value: "1,086",
        detail: "87% of registrations",
        changePositive: true,
      },
      {
        title: "Checked in",
        value: "742",
        detail: "+128 since 08:00",
        changePositive: true,
      },
      {
        title: "Attendance rate",
        value: "68.3%",
        detail: "4.8% above target",
        changePositive: true,
      },
    ];
  },

  getCompactMetrics(): CompactMetric[] {
    return [
      { label: "Onsite", value: "100", change: "+4" },
      { label: "Countries", value: "683", change: "+4" },
      { label: "Institutions", value: "100", change: "+4" },
      { label: "Categories", value: "683", change: "+4" },
    ];
  },

  getAcademicDistribution(): AcademicDistribution {
    return {
      bachelors: 10,
      masters: 50,
      others: 20,
    };
  },

  getAttendanceTrend(): HourlyAttendance[] {
    return [
      { hour: "8:00", count: 20 },
      { hour: "9:00", count: 35 },
      { hour: "10:00", count: 60 },
      { hour: "11:00", count: 85 },
      { hour: "12:00", count: 70 },
      { hour: "13:00", count: 95 },
      { hour: "14:00", count: 120 },
      { hour: "15:00", count: 105 },
      { hour: "16:00", count: 135 },
      { hour: "17:00", count: 120 },
      { hour: "18:00", count: 180, isPeak: true },
      { hour: "19:00", count: 165, isPeak: true },
    ];
  },

  getAlerts(): OperationalAlert[] {
    return [
      {
        id: "alert-1",
        type: "warning",
        title: "Room B nearing capacity",
        detail: '184 / 200 seats for "Responsible AI".',
      },
      {
        id: "alert-2",
        type: "error",
        title: "12 failed badge prints",
        detail: "Printer 02 requires attention.",
      },
      {
        id: "alert-3",
        type: "info",
        title: "48 confirmations pending",
        detail: "Reminder campaign is ready.",
      },
      {
        id: "alert-4",
        type: "info",
        title: "48 confirmations pending",
        detail: "Reminder campaign is ready.",
      },
    ];
  },

  getRecentActivity(): RecentActivityItem[] {
    return [
      {
        id: "act-1",
        participantName: "Maya Chen",
        participantInitials: "MC",
        activity: "Checked in",
        type: "VIP",
        time: "2 min ago",
      },
      {
        id: "act-2",
        participantName: "Samuel Ncube",
        participantInitials: "SN",
        activity: "Registration confirmed",
        type: "Speaker",
        time: "8 min ago",
      },
      {
        id: "act-3",
        participantName: "Amina Diallo",
        participantInitials: "AD",
        activity: "Badge reprinted",
        type: "Attendee",
        time: "14 min ago",
      },
      {
        id: "act-4",
        participantName: "Peter Kamau",
        participantInitials: "PK",
        activity: "Joined Applied ML group",
        type: "Attendee",
        time: "21 min ago",
      },
      {
        id: "act-5",
        participantName: "Sarah Ochieng",
        participantInitials: "SO",
        activity: "Certificate generated",
        type: "Attendee",
        time: "32 min ago",
      },
      {
        id: "act-6",
        participantName: "David Mensah",
        participantInitials: "DM",
        activity: "Checked in",
        type: "Speaker",
        time: "45 min ago",
      },
      {
        id: "act-7",
        participantName: "Fatima Zahra",
        participantInitials: "FZ",
        activity: "Registration confirmed",
        type: "VIP",
        time: "1 hr ago",
      },
    ];
  },


  getConferenceData(conferenceId: string = "dsa-2027") {
    if (conferenceId === "dsa-2027") {
      return {
        kpis: this.getKpis(),
        compactMetrics: this.getCompactMetrics(),
        academicDistribution: this.getAcademicDistribution(),
        attendanceTrend: this.getAttendanceTrend(),
        alerts: this.getAlerts(),
        recentActivity: this.getRecentActivity(),
        hasData: true,
      };
    }

    return {
      kpis: [
        { title: "Registered", value: "—", detail: "No registrations yet", changePositive: false },
        { title: "Confirmed", value: "—", detail: "No confirmations yet", changePositive: false },
        { title: "Checked in", value: "—", detail: "Check-in not started", changePositive: false },
        { title: "Attendance rate", value: "—", detail: "Awaiting scans", changePositive: false },
      ],
      compactMetrics: [
        { label: "Onsite", value: "—", change: "No data" },
        { label: "Countries", value: "—", change: "No data" },
        { label: "Institutions", value: "—", change: "No data" },
        { label: "Categories", value: "—", change: "No data" },
      ],
      academicDistribution: { bachelors: 0, masters: 0, others: 0 },
      attendanceTrend: [],
      alerts: [],
      recentActivity: [],
      hasData: false,
    };
  },
};


