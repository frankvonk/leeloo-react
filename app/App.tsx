"use client";

import { useEffect, useState } from "react";
import { loadDatabase, readConnection, saveConnection } from "./lib/api";
import type { Connection, Database } from "./lib/types";

type Status =
  | { kind: "loading" }
  | { kind: "needsLogin" }
  | { kind: "error"; message: string }
  | { kind: "ready"; db: Database };

export default function App() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  async function connect(connection: Connection | null) {
    if (!connection) return setStatus({ kind: "needsLogin" });
    setStatus({ kind: "loading" });
    try {
      setStatus({ kind: "ready", db: await loadDatabase(connection) });
    } catch (error) {
      setStatus({ kind: "error", message: String(error) });
    }
  }

  useEffect(() => {
    connect(readConnection());
  }, []);

  if (status.kind === "loading") return <p>Getting your precious data for you!</p>;
  if (status.kind === "needsLogin" || status.kind === "error") {
    return (
      <>
        {status.kind === "error" && <p style={{ color: "crimson" }}>{status.message}</p>}
        <ConnectionForm
          onSubmit={(connection) => {
            saveConnection(connection);
            connect(connection);
          }}
        />
      </>
    );
  }

  // Step 1 output: prove the data arrives. UI comes in the next steps.
  const { db } = status;
  return (
    <main style={{ padding: 16 }}>
      <h1>Data loaded</h1>
      <ul>
        {db.categories.map((category) => (
          <li key={category.id}>
            {category.description} ({category.tasks?.length ?? 0} tasks)
          </li>
        ))}
      </ul>
      <p>
        History: {db.history?.length ?? 0} · Bin: {db.deleted?.length ?? 0}
      </p>
    </main>
  );
}

function ConnectionForm({ onSubmit }: { onSubmit: (connection: Connection) => void }) {
  const fields: (keyof Connection)[] = [
    "userName",
    "password",
    "DB_CONNSTRING",
    "DB_USERNAME",
    "DB_PASSWORD",
  ];
  return (
    <form
      style={{ display: "grid", gap: 8, maxWidth: 360, padding: 16 }}
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit(Object.fromEntries(fields.map((f) => [f, String(data.get(f) ?? "")])) as Connection);
      }}
    >
      {fields.map((field) => (
        <label key={field} style={{ display: "grid" }}>
          {field}
          <input
            name={field}
            type={/password/i.test(field) ? "password" : "text"}
            defaultValue={typeof window !== "undefined" ? localStorage.getItem(field) ?? "" : ""}
          />
        </label>
      ))}
      <button type="submit">Connect</button>
    </form>
  );
}
