# gux-datepicker manual accessibility testing status

**Last Updated:** 2025-01-31T21:12:45.255Z
| Pass | WCAG Success Criterion | Notes |
| --- | --- | --- |
| ❌ | [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | COMUI-3440 Forward and back arrows should have alternative text |
| ❌ | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | COMUI-827 Forward and back arrows should be focusable. Keyboard navigation within the date input field should be more clear to screenreader user |
| ✅ | [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | - |
| ✅ | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | - |
| ❌ | [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | COMUI-3440 check with UX if the back and forward buttons should be focusable and have a focus indicator |
| ✅ | [2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) | - |
| ❌ | [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html#dfn-name) | COMUI-827 The day, month and year is read to the screenreader, but it should be reworded in a more natural way |
| ✅ | [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) | - |
| ✅ | [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) | - |
| ✅ | [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) | - |
| ✅ | [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | - |
| ❌ | [3.2.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | COMUI-3441 The input for the date does not communicate what format is expected |
| ❌ | [4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | COMUI-3442 confirm if we need aria-role on the gux-icon calendar |
| ✅ | [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | - |
