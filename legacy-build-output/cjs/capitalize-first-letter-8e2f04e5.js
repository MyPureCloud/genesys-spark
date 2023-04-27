'use strict';

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

exports.capitalizeFirstLetter = capitalizeFirstLetter;
