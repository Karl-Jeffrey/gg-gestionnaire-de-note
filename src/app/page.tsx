import Header from "@/components/Header";
import Note from "@/components/Note"; // Assure-toi d'importer selon l'export dans Note.tsx
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { desc, eq, and } from "drizzle-orm";

export default async function Home() {
  const user = await getUser();

  // Récupérer uniquement les notes non archivées (archived = false)
  const _notes = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, user.id), eq(notes.archived, false))) // Filtrer sur 'archived = false'
    .orderBy(desc(notes.updatedAt));

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24">
      <Header />

      <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {_notes.map((note) => (
          <Note key={note.id} note={note} /> // Utilisation du composant Note
        ))}
      </div>  
    </main>
  );
}
