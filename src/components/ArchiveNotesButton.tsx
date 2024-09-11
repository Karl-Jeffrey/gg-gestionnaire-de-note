'use client';

import { useState } from 'react';
import { Archive } from 'lucide-react';
import { Note } from '@/db/schemas/notes';
import { cn } from '@/lib/utils';
import { archiveNoteAction } from '../actions/notes'; // Import de l'action d'archivage

type Props = {
  note: Note;
  onArchive: (noteId: number) => void; // Fonction pour mettre à jour l'UI après l'archivage
};

function ArchiveButton({ note, onArchive }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // État pour gérer le message de confirmation ou d'erreur

  const handleArchive = async () => {
    setLoading(true);
    try {
      // Appeler l'action `archiveNoteAction` pour archiver la note
      const result = await archiveNoteAction(note.id);

      if (result?.errorMessage) {
        // Si une erreur est retournée, on l'affiche
        setMessage(result.errorMessage);
      } else {
        // Si l'archivage a réussi, on met à jour l'UI
        onArchive(note.id);
        setMessage('Note archivée avec succès !'); // Affiche un message de succès
      }
    } catch (error) {
      console.error('Erreur inconnue lors de l\'archivage:', error);
      setMessage('Erreur inconnue lors de l\'archivage.'); // Affiche un message générique si une erreur inconnue survient
    } finally {
      setLoading(false);

      // Efface le message après 3 secondes
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <button
        className={cn('text-muted-foreground size-5')}
        onClick={handleArchive}
        disabled={loading}
      >
        <Archive />
      </button>

      {/* Notification affichée après l'archivage */}
      {message && (
        <div className="mt-2 text-center text-sm text-green-500">
          {message}
        </div>
      )}
    </div>
  );
}

export default ArchiveButton;
