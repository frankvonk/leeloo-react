import type { Database } from "../../lib/types";

// Main screen of the app. Receives the loaded database from App.tsx.
export default function CreationContainer({ db }: { db: Database }) {
  return (
    <main style={{ padding: 16 }}>
      <h1>Create  new</h1>
      <ul>
        {db.categories.map((category) => (
          <li key={category.id}>
            {category.description} ({category.tasks?.length ?? 0} tasks)
          </li>
        ))}
      </ul>
    
    </main>
  );
}
