"use client";

import { useTheme } from "next-themes";
import * as React from "react";

type Point = {
  x: number;
  y: number;
};

type PageTransitionContextValue = {
  transitionTheme: (nextTheme: "light" | "dark", origin?: Point) => void;
};

type PageTransitionProviderProps = {
  children: React.ReactNode;
};

const PageTransitionContext =
  React.createContext<PageTransitionContextValue | null>(null);

function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const transitionTheme = React.useCallback(
    (nextTheme: "light" | "dark") => {
      if (resolvedTheme === nextTheme) {
        return;
      }

      setTheme(nextTheme);
    },
    [resolvedTheme, setTheme],
  );

  return (
    <PageTransitionContext.Provider value={{ transitionTheme }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

function usePageTransition() {
  const context = React.useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }

  return context;
}

export { PageTransitionProvider, usePageTransition };
