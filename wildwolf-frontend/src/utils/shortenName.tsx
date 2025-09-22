export function shortenName(names: string[]): string {
  if (names.length > 2) {
    return `${names[0]}, ${names[1]}, ...`;
  }
  return names.join(", ");
}
