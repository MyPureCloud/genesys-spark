'use strict';

const simulateNativeEvent = require('./simulate-native-event-fe3e62da.js');

function setInputValue(input, value, focusAfter) {
  input.value = value;
  simulateNativeEvent.simulateNativeEvent(input, 'input');
  simulateNativeEvent.simulateNativeEvent(input, 'change');
  if (focusAfter) {
    input.focus();
  }
}

exports.setInputValue = setInputValue;
