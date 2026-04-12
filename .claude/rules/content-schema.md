---
description: JSON content file schemas - edit these for display text changes, not component code
globs: content/**/*.json
---

# Content JSON Schemas

All display data lives in `content/`. Components read from these files. To change what the site shows, edit the JSON. Only touch component code for layout/styling changes.

## career/milestones.json
Mountain timeline cards. Real company names are used here.
```ts
{
  id: number,
  year: string,           // "2020"
  title: string,          // "Data Analyst"
  company: string,        // "Ovative Group" (real names OK here)
  description: string,    // "Where it started."
  skills: string[],       // ["SQL", "BigQuery", "Tableau"]
  highlights: string[]    // ["First job out of college", "Built predictive ROAS models"]
}
```
Note: highlight bubbles on the mountain are NOT from this file - they're hardcoded in CareerMountain.tsx.

## career/projects.json
Work section cards. NO specific SaaS product names (no Salesforce, Rattle, Clari, Gong).
```ts
{
  replaced: string,       // "REPLACED: Legacy CRM (deal management)"
  name: string,           // "Internal AI CRM - Deal Slack Ops"
  period: string,         // "2024-Present"
  org: string,            // "Sigma Computing"
  tag: "ONGOING" | "PRODUCTION" | "INFRASTRUCTURE",
  description: string,
  stack: string[],
  partners?: string[],    // ["CMO", "COO", "CEO"]
  href?: string           // internal blog link
}
```

## career/misc.json
MiscGrid 4-column info cards.
```ts
{
  label: string,          // "Currently building"
  value: string,          // main display text
  sub?: string,           // subtitle
  href?: string,
  isLink?: boolean
}
```

## personal/book.json
Single book-of-the-month feature.
```ts
{
  title: string,
  author: string,
  year: string,
  genre: string,
  coverPlaceholder: string,  // local image path
  pullQuote: string,
  review: string,
  readingStatus: string,
  month: string,
  rating: number             // 1-5
}
```

## personal/hobbies.json
Hobby grid cards.
```ts
{
  tag: string,            // "THE UNIVERSE", "HOME BASE"
  title: string,
  desc: string,
  image?: string | null,  // URL or null
  wide: boolean           // wide card layout
}
```

## personal/countries.json
Countries visited for the world map.
```ts
{
  name: string,           // "Japan"
  note: string            // personal travel memory
}
```

## personal/reading-list.json
Curated articles/essays.
```ts
{
  title: string,
  author: string,
  source: string,         // publication name
  href: string,           // external URL
  blurb: string
}
```

## blog/posts.json
Published articles (links to external sources).
```ts
{
  title: string,
  description: string,
  date: string,
  author: string,
  url: string,            // external URL
  image: string,          // cover image URL
  source: string          // "Sigma Blog", "Medium", etc.
}
```
