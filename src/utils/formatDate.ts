export function formatDate(value: Date | string): string {
  const valueFormated = new Date(value);

  return valueFormated.toLocaleDateString();
}
