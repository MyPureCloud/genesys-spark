# Building and Testing Components with Accessibility in Mind

## Introduction

Keyboard users, screen reader users, and mouse users should all have equal access to features and a similar level of user experience quality when interacting with an interface. All content and interactive elements should be accessible to all users. There are several cases to keep in mind when building accessible interfaces:

1. Users who can see the screen and primarily use a mouse to navigate the page
2. Users who can see the screen, but use a keyboard or other non-mouse device to navigate the page
3. Users who cannot see the screen and use a keyboard and a screen reader to navigate the page

To build accessible components and prevent regressions, we use both automated and manual forms of accessibility testing in the Genesys Spark library.

The Genesys Spark components are tested against the WCAG 2.2 AA accessibility standards.

## Automated Accessibility Testing

For automated accessibility testing, we leverage the [Axe testing library](https://github.com/dequelabs/axe-core) in our E2E tests. Axe can detect many WCAG violations automatically. Axe accessibility checks should be added to each component’s E2E tests. The Axe scan should be run in each possible state of the component. For example:

1. Open and closed state of dropdowns and popups
2. Different color/style variations

Add `await a11yCheck(page, axeExclusions, description);` to an e2e test to run an a11y scan.

- `page` (required): e2ePage,
- `axeExclusions` (optional): a violation that is to be ignored for this test. If the violation needs to be addressed, please create a ticket and add the ticket number to the 'exclusion reason'. If the violation has been deemed to be a non-issue, add the reason why it is not an issue to the 'exclusion reason'.

  Here is an example exclusion:

  ```
  const axeExclusions = [
    {
      issueId: 'color-contrast',
      target: 'span',
      exclusionReason:
        'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
    }
  ];
  ```

- `description` (optional): Add extra context for the scan if more than one scan is added to a test. For example, two axe scans within the same test could use the descriptions 'before opening dropdown' and 'after opening dropdown'

## Manual Accessibility Testing

### Basics

Many accessibility violations can be identified through automated accessibility checks, but manual accessibility testing is required to fully test accessibility requirements. When manually checking accessibility, you will need to use a screen reader and the keyboard to navigate the page. There are two screen reader modes that you will want to use: `Focus` and `Browse`.

You will primarily use the `Focus` mode, which involves using the `tab` key to navigate to focusable elements. A list of common patterns for interacting with elements using a keyboard can be found on [WebAIM](https://webaim.org/techniques/keyboard/#testing).

The `Browse` mode will read through all the elements of the page, even the elements that are not focusable. Using `Browse` mode can help you discover bugs and elements inaccessible to a screen reader.

Screen readers offer additional modes and shortcuts for navigating specific types of elements, such as tables. If an element has correct markup but seems inaccessible during manual testing, check the screen reader docs for that type of element. There may be another strategy for accessing that element with a screen reader.

To learn more about how to use a screen reader, please view the following resources:

- [Voiceover Controls](https://support.apple.com/guide/voiceover/text-commands-cpvokys06/mac) (Mac)
- [NVDA Controls](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts) (Windows)

### Manually testing components

Manual accessibility tests should be run after making changes to a component that could affect accessibility. Run `npm run check-a11y` to start the interactive accessibility check prompts. The interactive script will ask a [series of questions that describe WCAG AA criteria](#accessibility-manual-testing-checklist). As you answer each question, test the component using the keyboard and voiceover.

If you find an issue while checking the component, please make a COMUI ticket. If there are multiple issues within a given component, the issues can be combined into one ticket. Provide the ticket number and an optional one-line description of the issue when the interactive prompt asks for more information.

After finishing the prompts for the given component, a markdown file will be created and added to the component's folder.

To check the status of the manual accessibility testing in the project, run `npm run list-checked-a11y-components`. This will output a table in the console showing the status of test passes and failures.

### Accessibility Manual Testing Checklist

The following criteria should be met to pass the manual accessibility checks

1. [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard):

   - **WCAG criterion summary:**
     "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints"

   - **How to check**:
     All functionality that is available to a mouse user should also be usable to a keyboard user. If unsure of how a certain element should behave, it is always a good first step to research the keyboard behavior of a comparable native HTML element. Also, see this resource on [WebAIM](https://webaim.org/techniques/keyboard/#testing) for some common keyboard interaction patterns.

2. [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap)

   - **WCAG summary:**
     "If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away"

   - **How to check:**
     Make sure that keyboard focus order does not loop within an element without a clear way to exit. One common example of keyboard trap is within modal components. Common acceptable methods of exiting a component with focus trap is through `tab` or `escape` keys.

3. [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)

   - **WCAG summary:**
     "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability"

   - **How to check:**
     When 'tabbing' through the interface, you should expect the focus order to match the order that the content is visually presented.

4. [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)

   - **WCAG summary:**
     "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible"

   - **How to check:**
     Navigate through the component using the keyboard, using `tab`. In some components, like dropdowns, use the arrow keys to navigate. There should always be a visual focus indicator on each interactive element.

5. [2.4.11 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) **(Newly Added in WCAG 2.2)**

   - **WCAG summary:**
     "Ensure when an item gets keyboard focus, it is at least partially visible"

   - **How to check:**
     When 'tabbing' through the interface, you should ensure that the focus indicator and the item receiving focus is not completely visually covered or blocked by any other element

6. [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name)

   - **WCAG summary:**
     "For user interface components with labels that include text or images of text, the name contains the text that is presented visually"

   - **How to check:**
     Everything that is presented visually should also be presented to the screen reader. Icons and images should have screen reader accessible text. Make sure that what is read out by the screen reader matches what is shown visually.

7. [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) **(Newly Added in WCAG 2.2)**

   - **WCAG summary:**
     "For any action that involves dragging, provide a simple pointer alternative"

   - **How to check:**
     Any interfaces that involve dragging need to be accessible for keyboard-only users and need to be accessible by mouse without requiring dragging movements. Check to make sure there is a simpler mouse alternative available for any dragging actions. For example, buttons could be implemented for a mouse operated alternative to click and hold dragging motions.

8. [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus)

   - **WCAG summary:**
     "When any user interface component receives focus, it does not initiate a change of context"

   - **How to check**:
     Ensure that focusing an element does not automatically change the page context. For example, focusing on a button should not move the user's focus to a different element. This violation is rare but good to keep in mind when doing manual accessibility checks

9. [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input)

   - **WCAG summary:**
     "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component"

   - **How to check**:
     Similar to the `3.2.1 On Focus` criterion, ensure that input from a user does not change context. For example, user input should not move user's focus. Like the On Focus criterion, this violation is rare but good to keep in mind when doing manual accessibility checks.

10. [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)

    - **WCAG summary:**
      "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text."

    - **How to check**:
      All fields that have error handling must communicate that error visually and to the screen reader. Error messages should be linked to the input using `aria-describedby`.

11. [3.2.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions)

    - **WCAG summary:**
      "Labels or instructions are provided when content requires user input"

    - **How to check:**
      Inputs need descriptive labels. The input's expected content, format and instructions should be clearly communicated to the screen reader. If there is information that is conveyed only visually, it needs to be available to screen readers as well. The best way to give an input a label is to add a visible `<label>` with a "for" attribute set to the id of the input field. Another way to link the input field to the label is to add an `aria-labelledby` attribute set to the id of the label. Another way to add a screen reader accessible label is to add an `aria-label` attribute to the input. If additional information needs to be linked to the input, add the `aria-describedby` attribute to the input and associate it with the id of the element containing the additional information.

12. [4.1.2: Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value)

    - **WCAG summary:**
      "For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies."

    - **How to check:**
      Make sure that the purpose, role, and state of the element is clearly conveyed to a screen reader. [Use HTML semantic elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) when possible. Use aria attributes if HTML semantic elements cannot be used and to add more context for screen reader users. Familiarity with [Aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) is needed to fully check this criterion.

13. [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)

    - **WCAG summary:**
      "In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus."

    - **How to check:**
      When a status changes or a new element appears on the page, this should be communicated to the screen reader even if the user is not focused on that element. For example, a toast element could be given an `aria-live` attribute to ensure that the status message within the toast is announced to the user in a timely manner.
