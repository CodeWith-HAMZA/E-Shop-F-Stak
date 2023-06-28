export function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str; // Return the input if it's not a string or empty
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
