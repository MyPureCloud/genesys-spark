const guxButtonMultiAccent = ['primary', 'secondary', 'tertiary'] as const;

export type GuxButtonMultiAccent = (typeof guxButtonMultiAccent)[number];

export function getGuxButtonMultiAccent(
  maybeGuxButtonMultiAccent: string
): GuxButtonMultiAccent {
  if (
    guxButtonMultiAccent.find(
      validType => validType === maybeGuxButtonMultiAccent
    )
  ) {
    return maybeGuxButtonMultiAccent as GuxButtonMultiAccent;
  }

  return 'secondary';
}
