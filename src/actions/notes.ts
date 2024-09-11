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

    await db.insert(notes).values({ text, userId: user.id, archived: false });

    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// Action pour archiver une note
export const archiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ archived: true })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// Action pour désarchiver une note
export const unarchiveNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ archived: false })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/archive");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// Action pour supprimer une note
export const deleteNoteAction = async (noteId: number) => {
  try {
    const user = await getUser();

    await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};

// Action pour éditer une note
export const editNoteAction = async (noteId: number, newText: string) => {
  try {
    const user = await getUser();

    await db
      .update(notes)
      .set({ text: newText, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, user.id)));

    revalidatePath("/");
    return { errorMessage: null };
  } catch (error) {
    return { errorMessage: getErrorMessage(error) };
  }
};
