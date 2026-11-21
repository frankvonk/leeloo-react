"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Database } from "./types";

type DbContextValue = { db: Database };

const DbContext = createContext<DbContextValue | null>(null);

// The single source of truth for the database. Wrap the app (or a story) in it.
// For now it only holds the db; editing actions (toggleDone, ...) come later.
export function DbProvider({ initialDb, children }: { initialDb: Database; children: ReactNode }) {
  const [db] = useState(initialDb);
  return <DbContext.Provider value={{ db }}>{children}</DbContext.Provider>;
}

// Use in any component inside <DbProvider>: const { db } = useDb();
export function useDb() {
  const value = useContext(DbContext);
  if (!value) throw new Error("useDb() must be used inside <DbProvider>");
  return value;
}
