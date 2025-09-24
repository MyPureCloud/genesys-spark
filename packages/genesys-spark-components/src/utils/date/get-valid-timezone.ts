export function getValidTimezone(input: string, fallback?: string): string {
  try {
    const normalizedTimezone = Intl.DateTimeFormat('en-US', {
      timeZone: input
    }).resolvedOptions().timeZone;
    return normalizedTimezone;
  } catch (err) {
    console.error(err);
    return fallback;
  }
}
