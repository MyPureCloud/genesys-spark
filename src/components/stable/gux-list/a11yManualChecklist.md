# gux-list manual accessibility testing status
**Last Updated:** Tue Dec 21 2021 16:18:29 GMT-0500 (Eastern Standard Time)
| Pass | WCAG Success Criterion | Notes |
| --- | --- | --- |
| ❌ | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) | COMUI-820 instead of focusing on the container, focus should go to the first interactive element or selected element in the list |
| ✅ | [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html) | - |
| ✅ | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) | - |
| ❌ | [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) | COMUI-820 |
| ✅ | [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html#dfn-name) | - |
| ✅ | [3.2.1 On Focus](https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html) | - |
| ✅ | [3.2.2 On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html) | - |
| ✅ | [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html) | - |
| ❌ | [3.2.2 Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html) | COMUI-820 when focused on the list container, it is not clear that the user needs to use the up and down arrows to enter the list |
| ❌ | [4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) | COMUI-820 in reading mode, the gux-list-divider is being counted as a list item. The interactive list items in the list may need a role of 'button' |
| ✅ | [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html) | - |