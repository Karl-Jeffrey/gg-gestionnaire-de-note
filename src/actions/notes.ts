'use server';

import db from "@/db";
import { notes } from "@/db/schemas/notes";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Action pour ajouter une nouvelle note
export const addNewNoteAction = async (formData: FormData) => {
  try {
    const user = await getUser();
    const text = formData.get("text") as string;

    // Ajout de la nouvelle note avec 'archived' par défaut à false
    await db.insert(notes).values({ text, userId: user.id, archived: false });

    revalidatePath("/"); // Force la mise à jour de la page principale
    return { errorMessage: null }; // Retourne null en cas de succès
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }; // Retourne un message d'erreur en cas d'échec
  }
};

// Action pour archiver une note
export const archiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ archived: true }) // Met à jour la colonne 'archived' à true
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/archive"); // Force la mise à jour de la page des archives
    return { errorMessage: null }; // Retourne null en cas de succès
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }; // Retourne un message d'erreur en cas d'échec
  }
};

// Action pour désarchiver une note
export const unarchiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ archived: false }) // Met à jour la colonne 'archived' à false
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/archive"); // Force la mise à jour de la page des archives
    return { errorMessage: null }; // Retourne null en cas de succès
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }; // Retourne un message d'erreur en cas d'échec
  }
};

// Action pour supprimer une note
export const deleteNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/"); // Force la mise à jour de la page principale après suppression
    return { errorMessage: null }; // Retourne null en cas de succès
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }; // Retourne un message d'erreur en cas d'échec
  }
};
