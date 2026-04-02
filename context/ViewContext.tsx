"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type View = "career" | "personal";

interface ViewContextValue {
  view: View;
  setView: (v: View) => void;
}

const ViewContext = createContext<ViewContextValue>({
  view: "career",
  setView: () => {},
});

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<View>("career");

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("site-view") as View | null;
    if (stored === "career" || stored === "personal") {
      setViewState(stored);
    }
  }, []);

  // Apply data-view attribute + persist on change
  useEffect(() => {
    document.documentElement.setAttribute("data-view", view);
    localStorage.setItem("site-view", view);
  }, [view]);

  const setView = (v: View) => setViewState(v);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
