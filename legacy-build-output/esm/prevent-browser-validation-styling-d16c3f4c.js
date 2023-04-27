function preventBrowserValidationStyling(input) {
  input.addEventListener('invalid', event => {
    event.preventDefault();
  });
}

export { preventBrowserValidationStyling as p };
