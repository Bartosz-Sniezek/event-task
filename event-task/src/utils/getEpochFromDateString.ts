export function getEpochFromDateString(input: string): number {
  const date = new Date(input);

  return date.getTime();
}