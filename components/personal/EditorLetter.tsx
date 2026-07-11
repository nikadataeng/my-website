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
        <span>¶ Summer 2026</span>
      </div>

      <div className="ed-letter__grid">
        {/* Main column */}
        <ScrollReveal className="ed-letter__main">
          <p className="ed-letter__kicker">¶ A letter, between issues</p>
          <h2 className="ed-letter__title">Welcome to summer.</h2>
          <p className="ed-letter__lede">
            This issue starts in San Francisco fog, spends a week in Mexico
            City sun, and lands back in New York — which feels about right
            for the season.
          </p>

          <div className="ed-letter__body">
            <p className="first">
              I wrote most of this one on the other side of a very good trip.
              Z and I spent the first week of July in Mexico City, arrived to
              a country mid-FIFA-fever, and came home with a blue vase, sore
              feet, and more opinions about guava rolls than I expected to
              have. That story leads this issue.
            </p>
            <p>
              The rest of the season collects the usual: what&apos;s on the
              nightstand, hobbies I won&apos;t shut up about, essays I keep
              re-sending to friends. None of it is news. All of it is still
              on my mind.
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
