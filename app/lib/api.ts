import type { Connection, Database } from "./types";

// In dev, Next runs on :3000 and PHP on :9000. In production the static build
// sits next to controller.php, so a relative URL works.
const CONTROLLER_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/controller.php"
    : "controller.php";

const CONNECTION_KEYS: (keyof Connection)[] = [
  "userName",
  "password",
  "DB_CONNSTRING",
  "DB_USERNAME",
  "DB_PASSWORD",
];

// Same localStorage keys as the vanilla app, so production keeps existing logins.
export function readConnection(): Connection | null {
  try {
    const entries = CONNECTION_KEYS.map((key) => [key, localStorage.getItem(key) ?? ""]);
    const connection = Object.fromEntries(entries) as Connection;
    return connection.userName && connection.DB_CONNSTRING ? connection : null;
  } catch {
    return null;
  }
}

export function saveConnection(connection: Connection) {
  for (const key of CONNECTION_KEYS) localStorage.setItem(key, connection[key]);
}

// Stored data is either plain JSON or base64-encoded UTF-8 JSON.
function parseDatabase(raw: string): Database {
  const text = raw.trim();
  if (text.startsWith("{")) return JSON.parse(text);
  const bytes = Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function loadDatabase(connection: Connection): Promise<Database> {
  const params = new URLSearchParams({ action: "getDatabase", ...connection });
  const response = await fetch(`${CONTROLLER_URL}?${params}`);
  if (!response.ok) throw new Error(`controller.php answered ${response.status}`);

  const text = await response.text();
  if (text.trim().length <= 4) throw new Error("No user found. You are not connected.");
  return parseDatabase(text);
}
