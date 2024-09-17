const iconMetadata = require('../../icon-metadata.json');

exports.generateIconListJSON = function generateIconListJSON() {
  return JSON.stringify(iconMetadata);
};
