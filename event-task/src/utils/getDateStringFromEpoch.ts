export function getDateStringFromEpoch(input: number): string {
  const date = new Date(input);
  
  return date.toDateString();
}