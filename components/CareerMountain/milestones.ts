export interface Milestone {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  highlights: string[];
}

export const milestones: Milestone[] = [
  {
    id: 1,
    year: "2020",
    title: "Data Analyst",
    company: "Ovative Group",
    description: "Where it started.",
    skills: ["SQL", "BigQuery", "Tableau", "Marketing Analytics"],
    highlights: ["First job out of college", "Built predictive ROAS models"],
  },
  {
    id: 2,
    year: "2021",
    title: "Data Analyst & PM",
    company: "WITHIN Co",
    description: "Found the product instinct.",
    skills: ["dbt", "BigQuery", "Marketing Analytics"],
    highlights: ["Moved to NYC", "Pitched Estée Lauder — $2M contract"],
  },
  {
    id: 3,
    year: "2022",
    title: "Analytics Engineer",
    company: "Sigma Computing",
    description: "Joined Sigma. Built the foundation.",
    skills: ["dbt", "Snowflake", "AI", "GTM", "Finance", "Customer Success"],
    highlights: ["Worked with the exec team", "Sigma hackathon winner"],
  },
  {
    id: 4,
    year: "2024",
    title: "AI Applications Engineer",
    company: "Sigma Computing",
    description: "Created the role from scratch.",
    skills: ["Agentic AI", "AI Workflows", "LLMs", "Apps"],
    highlights: ["Built CRM replacement from scratch", "Reports to CMO, COO & CEO"],
  },
];
