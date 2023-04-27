'use strict';

function findElementById(root, forElementId) {
  let rootNode = root.getRootNode();
  let forElement;
  while (rootNode && !forElement) {
    forElement = rootNode === null || rootNode === void 0 ? void 0 : rootNode.getElementById(forElementId);
    rootNode = rootNode.getRootNode();
  }
  return forElement;
}

exports.findElementById = findElementById;
