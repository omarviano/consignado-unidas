export function formatDate(date: Date): string | null {
  if (!date) return null;

  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
    new Date(date),
  );
}
