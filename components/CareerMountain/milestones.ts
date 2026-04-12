import milestonesData from "@/content/career/milestones.json";

export interface Milestone {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  highlights: string[];
}

export const milestones: Milestone[] = milestonesData;
