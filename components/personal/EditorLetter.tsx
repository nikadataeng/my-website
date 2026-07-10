"use client";

import ScrollReveal from "../ScrollReveal";

export default function EditorLetter() {
  return (
    <section
      id="letter"
      className="ed-page ed-letter"
      data-screen-label="03 Letter"
    >
      <div className="ed-folio">
        <span>From the editor</span>
        <span>¶ Spring 2026</span>
      </div>

      <div className="ed-letter__grid">
        {/* Main column */}
        <ScrollReveal className="ed-letter__main">
          <p className="ed-letter__kicker">¶ A letter, between issues</p>
          <h2 className="ed-letter__title">Welcome to spring.</h2>
          <p className="ed-letter__lede">
            I started writing this issue the way I&apos;ve been living the year —
            in fragments, then on purpose.
          </p>

          <div className="ed-letter__body">
            <p className="first">
              Most of my work is the kind that doesn&apos;t leave a trail.
              Internal tools, dashboards a few people see, agents that quietly
              save someone an afternoon. I wanted a place that doesn&apos;t apologize
              for being slow, or earnest, or fond of long sentences — a
              counterweight to the rest of it. So I made one.
            </p>
            <p>
              The first issue collects the things I keep coming back to: places
              I&apos;ve been, books that stayed with me, hobbies I won&apos;t shut up
              about, essays I keep re-sending to friends. None of it is news.
              Some of it is years old. All of it is still on my mind.
            </p>
            <p>
              If you&apos;re here because you know me — welcome, you&apos;re in
              the right place. If you&apos;re here because the internet brought
              you, even better; pull up a chair. The kettle&apos;s on, the cats
              are around somewhere, and there&apos;s a stack of books on the
              coffee table waiting to be argued about.
            </p>
          </div>

          <p className="ed-letter__signoff">Nika.</p>
          <p className="ed-letter__role">Editor · Photographer · Subject</p>
        </ScrollReveal>

        {/* Aside / portrait */}
        <ScrollReveal className="ed-letter__aside" delay={0.1}>
          <div className="ed-letter__portrait" aria-hidden />
          <p className="ed-letter__caption">
            Filed from a sunny corner of San Francisco, cat-adjacent, mid-coffee.
          </p>
        </ScrollReveal>
      </div>

      <div className="ed-page-num">03</div>
    </section>
  );
}
