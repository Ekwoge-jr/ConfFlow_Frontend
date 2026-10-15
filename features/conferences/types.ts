export interface Conference {
  id: string;
  name: string;
  acronym: string;
  startDate: string; // ISO date or formatted
  endDate: string;
  formattedDate: string; // e.g. "Aug 08-11, 2027"
  city: string; // e.g. "Yaounde"
  country: string; // e.g. "Cameroon"
  venue?: string;
  status: "active" | "upcoming" | "archived";
  logoUrl?: string;
  participantCount?: number;
}

export interface CreateConferenceInput {
  name: string;
  acronym: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  venue?: string;
}

