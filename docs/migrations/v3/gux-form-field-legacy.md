# gux-form-field-legacy

[Back to main guide](./readme)

This should be a very simple migration as there is no difference between the api of the legacy component and the new ones. You will only need to change the tag name from `gux-form-field-legacy` to `gux-form-field-{type}`.

For slotted inputs that mapping is as follows:
  * input[type="checkbox"] => `gux-form-field-checkbox`
  * input[type="radio"] => `gux-form-field-radio`
  * input[type="color"] => `gux-form-field-color`
  * input[type="range"] => `gux-form-field-range`
  * input[type="email"] => `gux-form-field-text-like`
  * input[type="password"] => `gux-form-field-text-like`
  * input[type="text"] => `gux-form-field-text-like`
  * input[type="number"] => `gux-form-field-number`
  * input[type="search"] => `gux-form-field-search`

For slotted selects that mapping is as follows:
  * select => `gux-form-field-select`

For slotted textareas that mapping is as follows:
  * textarea => `gux-form-field-textarea`
