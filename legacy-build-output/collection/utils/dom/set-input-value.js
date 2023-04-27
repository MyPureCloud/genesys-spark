import simulateNativeEvent from './simulate-native-event';
export default function setInputValue(input, value, focusAfter) {
  input.value = value;
  simulateNativeEvent(input, 'input');
  simulateNativeEvent(input, 'change');
  if (focusAfter) {
    input.focus();
  }
}
