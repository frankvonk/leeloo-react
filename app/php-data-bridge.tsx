"use client";

import { useEffect, useState } from "react";

type MockData = {
  categories: Array<{ tasks?: unknown[] }>;
};

const phpOrigins = new Set([
  "http://localhost:9000",
  "http://127.0.0.1:9000",
]);

function isMockData(value: unknown): value is MockData {
  if (typeof value !== "object" || value === null || !("categories" in value)) {
    return false;
  }

  return (
    Array.isArray(value.categories) &&
    value.categories.every(
      (category) =>
        typeof category === "object" &&
        category !== null &&
        (!("tasks" in category) || Array.isArray(category.tasks)),
    )
  );
}

export default function PhpDataBridge() {
  const [mockData, setMockData] = useState<MockData | null>(null);

  useEffect(() => {
    function receivePhpData(event: MessageEvent<unknown>) {
      if (
        event.source !== window.parent ||
        !phpOrigins.has(event.origin) ||
        typeof event.data !== "object" ||
        event.data === null ||
        !("type" in event.data) ||
        event.data.type !== "leeloo:db-data" ||
        !("payload" in event.data) ||
        !isMockData(event.data.payload)
      ) {
        return;
      }

      setMockData(event.data.payload);
    }

    window.addEventListener("message", receivePhpData);
    const parentOrigin = document.referrer
      ? new URL(document.referrer).origin
      : "";
    if (phpOrigins.has(parentOrigin)) {
      window.parent.postMessage({ type: "leeloo:next-ready" }, parentOrigin);
    }

    return () => window.removeEventListener("message", receivePhpData);
  }, []);

  const taskCount =
    mockData?.categories.reduce(
      (total, category) => total + (category.tasks?.length ?? 0),
      0,
    ) ?? 0;


    

    function YoloComp() {
      return (
        <div
        className="bg-gray-200 green-500 "
        >
        1234
        </div>
      );
    }

  return (
    <main className="flex min-h-[72px] items-center border-b border-slate-200 bg-slate-50 px-4 text-sm text-slate-700">
      <div
        aria-live="polite"
        className="rounded-md bg-white px-3 py-2 shadow-sm"
      >
        {mockData
          ? `PHP- JSON received: ${mockData.categories.length} categories, ${taskCount} tasks`
          : "Waiting for PHP JSON…"}
      </div>

      <div
        aria-live="polite"
        className="rounded-md bg-white px-3 py-2 shadow-sm"
      >
        {mockData
          ? <YoloComp /> : <span>Waiting for PHP JSON…</span>}
      </div>
    </main>
  );
}
