export function preventBrowserValidationStyling(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): void {
  input.addEventListener('invalid', event => {
    event.preventDefault();
  });
}
