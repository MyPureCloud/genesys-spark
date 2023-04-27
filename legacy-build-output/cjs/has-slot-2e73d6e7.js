'use strict';

function hasSlot(element, slotName) {
  return Boolean(element.querySelector(`[slot=${slotName}]`));
}

exports.hasSlot = hasSlot;
