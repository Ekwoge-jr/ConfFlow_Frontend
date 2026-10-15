export type ConferenceStatus = "Confirmed" | "Checked-in" | "Pending";

export interface ConferenceSummary {
  id: string;
  name: string;
  status: ConferenceStatus;
}
