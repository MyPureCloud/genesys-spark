'use strict';

function preventBrowserValidationStyling(input) {
  input.addEventListener('invalid', event => {
    event.preventDefault();
  });
}

exports.preventBrowserValidationStyling = preventBrowserValidationStyling;
