'use client';

import { useState, useEffect } from 'react';
import { Note as NoteType } from "@/db/schemas/notes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ArchiveNotesButton from "./ArchiveNotesButton";
import { archiveNoteAction } from '@/actions/notes'; // Assure-toi que cette action est bien importée
import { toast } from 'react-hot-toast';

type Props = {
  note: NoteType;
  onArchive?: (noteId: number) => void;
};

function Note({ note, onArchive }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // Fonction pour archiver la note
  const handleArchive = async () => {
    try {
      const { errorMessage } = await archiveNoteAction(note.id);
      if (!errorMessage) {
        toast.success('Note archivée avec succès');
        if (onArchive) onArchive(note.id); // Appelle la fonction onArchive si elle est passée en prop
      } else {
        toast.error("Erreur lors de l'archivage de la note");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'archivage.");
    }
  };

  // Gestionnaire d'événements clavier
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isHovered && event.key === 'a') {
      handleArchive();
    }
  };

  useEffect(() => {
    // Ajout du gestionnaire d'événements pour le raccourci clavier
    window.addEventListener('keydown', handleKeyDown);

    // Suppression du gestionnaire d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)} // Active le survol
      onMouseLeave={() => setIsHovered(false)} // Désactive le survol
      className="custom-scrollbar bg-muted/80 h-96 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words rounded-lg p-6 shadow-note"
    >
      <div className="relative mb-2 flex items-center gap-2">
        <h2 className="text-muted-foreground text-lg font-semibold">
          {note.updatedAt.toISOString().slice(0, 10)}
        </h2>
        <ArchiveNotesButton note={note} onArchive={onArchive || (() => {})} />
        <EditButton note={note} />
        <DeleteButton noteId={note.id} />
      </div>

      <p>{note.text}</p>
    </div>
  );
}

export default Note;
