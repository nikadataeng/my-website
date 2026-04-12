/**
 * Magazine Design Research Agent
 *
 * Uses Claude with Anthropic's built-in web_search tool to research editorial
 * design patterns from Vanity Fair, Vogue, Harper's Bazaar and outputs a
 * structured design brief.
 *
 * Usage:
 *   npx tsx scripts/magazine-research-agent.ts
 */

import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a senior editorial art director with 20+ years experience at luxury print and digital magazines including Vanity Fair, Vogue, Harper's Bazaar, and The New Yorker.

Your job is to research the precise visual design language of these publications by searching the web for their current design systems, typography choices, color palettes, and layout patterns — then produce an actionable design brief that a developer can implement in a React/Next.js personal website.

Be specific: hex codes, font weights, column ratios, spacing rules, and real-world examples from their actual websites.`;

const USER_PROMPT = `Search the web to research the current editorial design DNA of Vanity Fair (vanityfair.com), Vogue (vogue.com), and Harper's Bazaar (harpersbazaar.com).

Search for:
1. Their current typography and font choices (especially display/headline fonts)
2. Color palette — backgrounds, text colors, accent colors
3. Layout patterns — grid structures, hero layouts, feature article spreads
4. Photography treatment — sizing, cropping, aspect ratios used
5. Whitespace philosophy and section dividers
6. Micro-details — drop caps, pull quotes, bylines, datelines, folio styles

After researching, produce a **design brief** structured as JSON with these keys:
- colors: { background, ink, accent, muted, surface, border } with hex values
- typography: { masthead, headline, deck, body, caption, pullquote } with font-family, size, weight, style details
- layout: { heroPattern, featureSpread, columnGrid, imageRatio } descriptions
- components: array of specific UI components to build (e.g. "full-bleed hero with overlaid headline")
- exampleSections: array of section ideas for a personal editorial page (travel feature, book review, etc.)

The brief is for a personal website styled after Vanity Fair's web editorial aesthetic, for an AI engineer in Bay Area who has visited 10 countries. Output the JSON inside a \`\`\`json code block.`;

async function runResearchAgent() {
  console.log("Starting magazine design research agent...\n");
  console.log("Searching the web for Vanity Fair, Vogue & Harper's Bazaar design patterns...\n");
  console.log("─".repeat(60) + "\n");

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
      } as unknown as Anthropic.Tool,
    ],
    messages: [{ role: "user", content: USER_PROMPT }],
  });

  // Print all text output as it appears
  let fullText = "";
  for (const block of response.content) {
    if (block.type === "text") {
      process.stdout.write(block.text);
      fullText += block.text;
    } else if (block.type === "tool_use") {
      console.log(`\n[web_search] Searching: "${(block.input as { query?: string }).query}"\n`);
    }
  }

  console.log("\n\n" + "─".repeat(60));

  // Extract and save JSON design brief
  const jsonMatch = fullText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch?.[1]) {
    try {
      const brief = JSON.parse(jsonMatch[1]);
      const outPath = join(process.cwd(), "scripts", "design-brief.json");
      writeFileSync(outPath, JSON.stringify(brief, null, 2));
      console.log("\nDesign brief saved to scripts/design-brief.json");
      console.log("\nKey findings:");
      if (brief.colors) {
        console.log("  Colors:", JSON.stringify(brief.colors, null, 4));
      }
      if (brief.typography?.headline) {
        console.log("  Headline font:", brief.typography.headline);
      }
    } catch {
      console.log("\nCould not parse JSON — raw output above contains the brief.");
    }
  }
}

runResearchAgent().catch((err) => {
  console.error("Agent error:", err.message ?? err);
  process.exit(1);
});
