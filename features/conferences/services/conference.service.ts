import { Conference, CreateConferenceInput } from "../types";

const INITIAL_CONFERENCES: Conference[] = [
  {
    id: "dsa-2027",
    name: "Data Science Africa",
    acronym: "DSA",
    startDate: "2027-08-08",
    endDate: "2027-08-11",
    formattedDate: "Aug 08-11, 2027",
    city: "Yaounde",
    country: "Cameroon",
    venue: "University of Yaounde I",
    status: "active",
    participantCount: 450,
  },
  {
    id: "ai-summer-school-2027",
    name: "AI Summer School",
    acronym: "AISS",
    startDate: "2027-09-15",
    endDate: "2027-09-20",
    formattedDate: "Sep 15-20, 2027",
    city: "Nairobi",
    country: "Kenya",
    venue: "Strathmore University",
    status: "upcoming",
    participantCount: 220,
  },
  {
    id: "health-informatics-2027",
    name: "Health Informatics Symposium",
    acronym: "HIS",
    startDate: "2027-11-04",
    endDate: "2027-11-07",
    formattedDate: "Nov 04-07, 2027",
    city: "Kigali",
    country: "Rwanda",
    venue: "Kigali Convention Centre",
    status: "upcoming",
    participantCount: 180,
  },
];

export const conferenceService = {
  async getConferences(): Promise<Conference[]> {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("confflow_conferences");
      if (stored) {
        try {
          return JSON.parse(stored) as Conference[];
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_CONFERENCES;
  },

  async createConference(input: CreateConferenceInput): Promise<Conference> {
    const conferences = await this.getConferences();
    
    // Generate slug id
    const slug = input.acronym
      ? input.acronym.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + new Date().getFullYear()
      : input.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    const newConf: Conference = {
      id: slug,
      name: input.name,
      acronym: input.acronym || input.name.slice(0, 3).toUpperCase(),
      startDate: input.startDate,
      endDate: input.endDate,
      formattedDate: `${input.startDate} - ${input.endDate}`,
      city: input.city,
      country: input.country,
      venue: input.venue,
      status: "upcoming",
      participantCount: 0,
    };

    const updated = [newConf, ...conferences];
    if (typeof window !== "undefined") {
      localStorage.setItem("confflow_conferences", JSON.stringify(updated));
    }

    return newConf;
  },
};

