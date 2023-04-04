const guxActionButtonAccent = [
  'primary',
  'secondary',
  'tertiary',
  'danger'
] as const;

export type GuxActionButtonAccent = (typeof guxActionButtonAccent)[number];

export function getGuxActionButtonAccent(
  maybeGuxActionButtonAccent: string
): GuxActionButtonAccent {
  if (
    guxActionButtonAccent.find(
      validType => validType === maybeGuxActionButtonAccent
    )
  ) {
    return maybeGuxActionButtonAccent as GuxActionButtonAccent;
  }

  return 'secondary';
}

export type GuxActionButtonType = 'button' | 'submit' | 'reset';
