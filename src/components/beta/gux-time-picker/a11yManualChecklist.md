# gux-time-picker manual accessibility testing status
**Last Updated:** Wed Dec 22 2021 12:00:20 GMT-0500 (Eastern Standard Time)
| Pass | WCAG Success Criterion | Notes |
| --- | --- | --- |
| ❌ | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) | COMUI-825 pressing esc when in the dropdown should close the dropdown and move focus back to the input |
| ✅ | [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html) | - |
| ✅ | [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html) | - |
| ❌ | [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) | COMUI-825 |
| ✅ | [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html#dfn-name) | - |
| ✅ | [3.2.1 On Focus](https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html) | - |
| ❌ | [3.2.2 On Input](https://www.w3.org/WAI/WCAG21/Understanding/on-input.html) | When typing a time, a popup of suggestions appears. This content is not announced to the screenreader |
| ❌ | [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html) | COMUI-825 There should be an indication, visually and to the screenreader, if the dropdown has no matches for the time input |
| ❌ | [3.2.2 Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html) | COMUI-825 There is no visual or screenreader instruction of the needed format of the time. There is also no indication of what restrictions there are on min/max time, or specified interval of time |
| ❌ | [4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html) | COMUI-825 it would be better to use the input type="time" rather than use the type="text" |
| ✅ | [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html) | - |