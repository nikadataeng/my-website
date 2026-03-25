"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Slot = { start: string; end: string };
type GroupedSlots = Record<string, Slot[]>;

const TZ = "America/Los_Angeles";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
    hour12: true,
  });
}

function formatDateTab(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: TZ,
  });
}

function formatDateFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: TZ,
  });
}

function groupByDate(slots: Slot[]): GroupedSlots {
  const groups: GroupedSlots = {};
  for (const slot of slots) {
    const key = new Date(slot.start).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
    if (!groups[key]) groups[key] = [];
    groups[key].push(slot);
  }
  return groups;
}

/* ── Input component ──────────────────────────────────────── */
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-label"
        style={{ color: "var(--color-muted)" }}
      >
        {label}
        {required && " *"}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--color-border)",
  background: "var(--color-bg)",
  color: "var(--color-ink)",
  outline: "none",
  fontSize: "var(--text-body)",
  padding: "0.625rem 0.875rem",
  width: "100%",
  fontFamily: "inherit",
};

/* ── Main component ───────────────────────────────────────── */
export default function BookingSection() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data) => {
        const fetchedSlots: Slot[] = data.slots ?? [];
        setSlots(fetchedSlots);
        const grouped = groupByDate(fetchedSlots);
        const firstDate = Object.keys(grouped).sort()[0] ?? null;
        setSelectedDate(firstDate);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  const grouped = groupByDate(slots);
  const dates = Object.keys(grouped).sort().slice(0, 5);

  async function handleBook() {
    if (!selectedSlot || !form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    setBookError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          notes: form.notes.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBooked(true);
        setMeetLink(data.meetLink ?? null);
      } else {
        setBookError("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setBookError("Something went wrong. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="book"
      className="px-6 md:px-12 lg:px-20"
      style={{
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <motion.p
            className="text-label mb-3"
            style={{ color: "var(--color-accent)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            let&apos;s connect
          </motion.p>
          <motion.h2
            className="text-section"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Book 30 min
          </motion.h2>
          <motion.p
            className="mt-4"
            style={{ color: "var(--color-muted)", maxWidth: "460px" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Pick a time that works for you. A Google Meet link goes out as soon as
            you confirm.
          </motion.p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <p className="text-label" style={{ color: "var(--color-muted)" }}>
            Checking availability…
          </p>
        )}

        {/* ── Fetch error ── */}
        {!loading && fetchError && (
          <p className="text-label" style={{ color: "var(--color-muted)" }}>
            Couldn&apos;t load availability right now.{" "}
            <a
              href="mailto:hello@ayonika.dev"
              className="link-underline"
              style={{ color: "var(--color-accent)", fontWeight: 700 }}
            >
              Email me instead →
            </a>
          </p>
        )}

        {/* ── Picker + Form ── */}
        {!loading && !fetchError && !booked && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: date tabs + time grid */}
            <div>
              {/* Date tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {dates.map((date) => {
                  const isActive = selectedDate === date;
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlot(null);
                      }}
                      className="text-label px-4 py-2 transition-colors"
                      style={{
                        border: `1px solid ${isActive ? "var(--color-ink)" : "var(--color-border)"}`,
                        background: isActive ? "var(--color-ink)" : "transparent",
                        color: isActive ? "var(--color-bg)" : "var(--color-muted)",
                        cursor: "pointer",
                      }}
                    >
                      {formatDateTab(grouped[date][0].start)}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence mode="wait">
                {selectedDate && grouped[selectedDate] && (
                  <motion.div
                    key={selectedDate}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {grouped[selectedDate].map((slot) => {
                      const isSelected = selectedSlot?.start === slot.start;
                      return (
                        <button
                          key={slot.start}
                          onClick={() => setSelectedSlot(isSelected ? null : slot)}
                          className="text-label py-3 px-2 transition-colors"
                          style={{
                            border: `1px solid ${isSelected ? "var(--color-ink)" : "var(--color-border)"}`,
                            background: isSelected ? "var(--color-ink)" : "transparent",
                            color: isSelected ? "var(--color-bg)" : "var(--color-ink)",
                            cursor: "pointer",
                          }}
                        >
                          {formatTime(slot.start)}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {dates.length === 0 && (
                <p className="text-label" style={{ color: "var(--color-muted)" }}>
                  No availability in the next 2 weeks.{" "}
                  <a
                    href="mailto:hello@ayonika.dev"
                    className="link-underline"
                    style={{ color: "var(--color-accent)", fontWeight: 700 }}
                  >
                    Email me →
                  </a>
                </p>
              )}
            </div>

            {/* Right: booking form */}
            <AnimatePresence>
              {selectedSlot && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="p-8 flex flex-col gap-5"
                    style={{
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                    }}
                  >
                    {/* Selected time summary */}
                    <div>
                      <p className="text-label mb-0.5" style={{ color: "var(--color-muted)" }}>
                        {formatDateFull(selectedSlot.start)}
                      </p>
                      <p
                        className="text-heading"
                        style={{ fontWeight: 700 }}
                      >
                        {formatTime(selectedSlot.start)}–{formatTime(selectedSlot.end)} PT
                      </p>
                    </div>

                    <Field label="Your name" required>
                      <input
                        type="text"
                        style={inputStyle}
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </Field>

                    <Field label="Your email" required>
                      <input
                        type="email"
                        style={inputStyle}
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </Field>

                    <Field label="What's this about? (optional)">
                      <textarea
                        rows={3}
                        style={{ ...inputStyle, resize: "none" }}
                        placeholder="Quick intro, project idea, collab…"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      />
                    </Field>

                    {bookError && (
                      <p className="text-label" style={{ color: "#c0392b" }}>
                        {bookError}
                      </p>
                    )}

                    <button
                      onClick={handleBook}
                      disabled={submitting || !form.name.trim() || !form.email.trim()}
                      className="text-label font-bold px-6 py-4 transition-opacity"
                      style={{
                        background: "var(--color-ink)",
                        color: "var(--color-bg)",
                        cursor:
                          submitting || !form.name.trim() || !form.email.trim()
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          !form.name.trim() || !form.email.trim() ? 0.4 : 1,
                        border: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      {submitting ? "Confirming…" : "Confirm booking →"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── Confirmation ── */}
        {booked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 max-w-md"
            style={{
              border: "1px solid var(--color-ink)",
              background: "var(--color-surface)",
            }}
          >
            <p className="text-label mb-2" style={{ color: "var(--color-accent)" }}>
              confirmed ✓
            </p>
            <p className="text-heading mb-3" style={{ fontWeight: 700 }}>
              See you then!
            </p>
            <p style={{ color: "var(--color-muted)", fontSize: "var(--text-body)" }}>
              Check your inbox for the calendar invite
              {meetLink ? " and Google Meet link." : "."}
            </p>
            {meetLink && (
              <a
                href={meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label font-bold link-underline inline-block mt-5"
                style={{ color: "var(--color-accent)" }}
              >
                Open Google Meet →
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
