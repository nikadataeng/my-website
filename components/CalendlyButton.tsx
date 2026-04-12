"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/ayonikabose99/15-min-chat";

export default function CalendlyButton() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  if (!rootElement) return null;

  return (
    <PopupButton
      url={CALENDLY_URL}
      rootElement={rootElement}
      text="Book 15 min →"
      className="link-underline"
      styles={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "clamp(16px, 1.5vw, 20px)",
        fontWeight: 500,
        color: "var(--color-accent)",
      }}
    />
  );
}
