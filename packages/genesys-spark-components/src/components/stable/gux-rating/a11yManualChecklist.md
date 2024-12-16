# gux-rating manual accessibility testing status

**Last Updated:** 2024-12-13T12:07:09.387Z
| Pass | WCAG Success Criterion | Notes |
| --- | --- | --- |
| ✅ | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | Compoent complies with keyboard interactions of the spinbutton role |
| ✅ | [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | - |
| ✅ | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | - |
| ❌ | [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Component itself has focus but the actual individual stars do not [COMUI-3314](https://inindca.atlassian.net/browse/COMUI-3314) |
| ✅ | [2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) | - |
| ✅ | [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html#dfn-name) | - |
| ✅ | [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) | - |
| ✅ | [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) | - |
| ✅ | [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) | - |
| ✅ | [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | While its possible for a value that outside the range to be applied programaticlly its not possible for a user to enter an incorrect value |
| ✅ | [3.2.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | Component requires an aria label and a warning is logged if one is not present |
| ❌ | [4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | Value changes are announced however they are percentage values, not whole numbers of stars [COMUI-3314](https://inindca.atlassian.net/browse/COMUI-3314) |
| ✅ | [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | - |
