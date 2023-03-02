import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';

function setInputValue(input, value, focusAfter) {
  input.value = value;
  simulateNativeEvent(input, 'input');
  simulateNativeEvent(input, 'change');
  if (focusAfter) {
    input.focus();
  }
}

export { setInputValue as s };
