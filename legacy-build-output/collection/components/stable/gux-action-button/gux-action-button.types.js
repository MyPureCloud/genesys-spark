const guxActionButtonAccent = [
  'primary',
  'secondary',
  'tertiary',
  'danger'
];
export function getGuxActionButtonAccent(maybeGuxActionButtonAccent) {
  if (guxActionButtonAccent.find(validType => validType === maybeGuxActionButtonAccent)) {
    return maybeGuxActionButtonAccent;
  }
  return 'secondary';
}
