const guxButtonMultiAccent = ['primary', 'secondary', 'tertiary'];
export function getGuxButtonMultiAccent(maybeGuxButtonMultiAccent) {
  if (guxButtonMultiAccent.find(validType => validType === maybeGuxButtonMultiAccent)) {
    return maybeGuxButtonMultiAccent;
  }
  return 'secondary';
}
