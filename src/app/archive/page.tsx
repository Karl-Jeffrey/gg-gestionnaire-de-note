import Note from "@/components/Note";
import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { desc, eq, and } from "drizzle-orm";

import HeaderArchive from "@/components/HeaderArchive";

export default async function archivePage() {
  const user = await getUser();

  // Modifier la requête pour ne récupérer que les notes archivées
  const _notes = await db
    .select()
    .from(notes)
    .where(and(eq(notes.userId, user.id), eq(notes.archived, true))) // Filtre sur archived = true
    .orderBy(desc(notes.updatedAt));

  // Si aucune note n'est archivée, afficher un message
  if (_notes.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center px-4 pb-24">
        <HeaderArchive />
        <p>Aucune note n'est archivée pour le moment.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pb-24">
      <HeaderArchive />

      <div className="mt-8 grid w-full max-w-[1800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {_notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </main>
  );
}
