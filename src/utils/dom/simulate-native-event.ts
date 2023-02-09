export default function simulateNativeEvent(
  targetElement: HTMLElement,
  nativeEventName: 'change' | 'input'
): boolean {
  switch (nativeEventName) {
    case 'change':
      return targetElement.dispatchEvent(
        new Event('change', {
          bubbles: true,
          composed: true
        })
      );

    case 'input':
      return targetElement.dispatchEvent(
        new Event('input', {
          bubbles: true
        })
      );
  }
}
