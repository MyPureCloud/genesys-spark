export function preventBrowserValidationStyling(input) {
  input.addEventListener('invalid', event => {
    event.preventDefault();
  });
}
