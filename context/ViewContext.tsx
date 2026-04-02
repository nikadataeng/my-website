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

function viewFromPath(pathname: string): View {
  if (pathname === "/personal") return "personal";
  return "career";
}

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<View>("career");

  // Read from URL path on mount
  useEffect(() => {
    setViewState(viewFromPath(window.location.pathname));
  }, []);

  // Apply data-view attribute on change
  useEffect(() => {
    document.documentElement.setAttribute("data-view", view);
  }, [view]);

  const setView = (v: View) => {
    setViewState(v);
    const path = v === "personal" ? "/personal" : "/";
    window.history.pushState(null, "", path);
  };

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
