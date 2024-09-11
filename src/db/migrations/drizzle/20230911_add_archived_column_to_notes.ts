import { HasDefault } from 'drizzle-orm';
import { boolean, PgBooleanBuilderInitial } from 'drizzle-orm/pg-core';

export const up = async (db: { schema: { alterTable: (arg0: string, arg1: (table: any) => void) => any; }; }) => {
  await db.schema.alterTable('notes', (table: { addColumn: (arg0: string, arg1: HasDefault<PgBooleanBuilderInitial<"archived">>) => void; }) => {
    table.addColumn('archived', boolean('archived').default(false)); // Ajoute la colonne 'archived'
  });
};

export const down = async (db: { schema: { alterTable: (arg0: string, arg1: (table: any) => void) => any; }; }) => {
  await db.schema.alterTable('notes', (table: { dropColumn: (arg0: string) => void; }) => {
    table.dropColumn('archived'); // Supprime la colonne 'archived' en cas de rollback
  });
};
