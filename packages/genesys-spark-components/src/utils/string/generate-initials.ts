export function generateInitials(name: string): string {
  const nameArray = name?.split(' ') ?? [];
  if (nameArray.length > 1) {
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  }
  return nameArray[0]?.charAt(0) + nameArray[0]?.charAt(1);
}
