import { useDb } from "../../lib/DbContext";
import Header from "../Header/Header";

// Main screen of the app. Reads the database from <DbProvider> (see App.tsx).
export default function Leeloo() {
  const { db } = useDb();
  
  return (
    <main style={{ padding: 16 }}>
      <Header />
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
