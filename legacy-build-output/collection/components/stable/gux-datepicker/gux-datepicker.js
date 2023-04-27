var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from '@stencil/core';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { randomHTMLId } from '@utils/dom/random-html-id';
import { afterNextRenderTimeout } from '@utils/dom/after-next-render';
import { asIsoDateRange, asIsoDate, fromIsoDateRange, fromIsoDate } from '@utils/date/iso-dates';
import { OnClickOutside } from '@utils/decorator/on-click-outside';
import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent } from '../../../i18n';
import translationResources from './i18n/en.json';
import { getCalendarLabels, isOutOfBoundsDate, incrementDay, incrementMonth, incrementYear, getFormattedDate, getIntervalLetter, getFormatSeparator, getPreviousIntervalRange, getNextIntervalRange, getIntervalOrder, getIntervalRange } from './gux-datepicker.service';
export class GuxDatepicker {
  constructor() {
    this.yearFormat = 'yyyy';
    /**
     * Indicates if the user is selecting the range with the mouse.
     * This prevents other events from processing on the input range.
     */
    this.isSelectingRangeWithMouse = false;
    this.lastYear = new Date().getFullYear();
    this.startInputId = randomHTMLId('gux-datepicker');
    this.endInputId = randomHTMLId('gux-datepicker');
    this.value = undefined;
    this.label = '';
    this.numberOfMonths = 1;
    this.startDayOfWeek = undefined;
    this.minDate = '';
    this.maxDate = '';
    this.mode = "single" /* CalendarModes.Single */;
    this.format = 'mm/dd/yyyy';
    this.disabled = false;
    this.formattedValue = '';
    this.minDateDate = undefined;
    this.maxDateDate = undefined;
    this.toFormattedValue = '';
    this.active = false;
  }
  watchValue() {
    this.updateDate();
  }
  watchMinDate(newDate) {
    if (newDate) {
      this.minDateDate = fromIsoDate(newDate);
    }
    else {
      this.minDateDate = null;
    }
  }
  watchMaxDate(newDate) {
    if (newDate) {
      this.maxDateDate = fromIsoDate(newDate);
    }
    else {
      this.maxDateDate = null;
    }
  }
  watchFormat(newFormat) {
    if (!newFormat.includes('yyyy')) {
      this.yearFormat = 'yy';
    }
    this.intervalOrder = getIntervalOrder(newFormat);
    this.lastIntervalRange = this.initialIntervalRange;
  }
  watchActiveCalendar(active) {
    if (active === true) {
      const startDateValue = fromIsoDate(this.value.split('/')[0]);
      // calendar should open to month containing the start date
      void this.calendarElement.resetCalendarView(startDateValue);
    }
  }
  onKeyDown(event) {
    if (this.isInputFieldEvent(event)) {
      this.focusedField = this.getInputFieldFromEvent(event);
      switch (event.key) {
        case 'Enter':
        case 'Escape':
          this.focusedField.blur();
          this.active = false;
          break;
        case 'Tab':
          // Allow default behavior of tabbing to the next element - the calendar toggle button
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.increment(-1);
          this.setCursorRange();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.increment(1);
          this.setCursorRange();
          break;
        case 'ArrowLeft': {
          event.preventDefault();
          const previousIntervalRange = getPreviousIntervalRange(this.format, this.intervalRange);
          this.setIntervalRange(previousIntervalRange);
          this.setCursorRange();
          break;
        }
        case 'ArrowRight': {
          event.preventDefault();
          const nextIntervalRange = getNextIntervalRange(this.format, this.intervalRange);
          this.setIntervalRange(nextIntervalRange);
          this.setCursorRange();
          break;
        }
        default:
          event.preventDefault();
          if (!this.isSelectingRangeWithMouse) {
            this.setIntervalRange({
              selectionStart: this.focusedField.selectionStart,
              selectionEnd: this.focusedField.selectionEnd
            });
            this.updateIntervalValue(event);
            this.setCursorRange();
          }
          break;
      }
    }
    else {
      switch (event.key) {
        case 'Enter':
        case 'Escape':
        case ' ': {
          this.active = false;
          const button = this.root.shadowRoot.querySelector('.gux-calendar-toggle-button');
          afterNextRenderTimeout(() => {
            button.focus();
          });
          break;
        }
        case 'Tab':
          if (this.active) {
            this.active = false;
          }
          break;
      }
    }
  }
  onMouseDown(event) {
    if (this.isInputFieldEvent(event)) {
      this.isSelectingRangeWithMouse = true;
    }
    const composedPath = event.composedPath();
    const inDatepicker = composedPath.includes(this.datepickerElement);
    const notToggleButton = Array.from(this.root.shadowRoot.querySelectorAll('.gux-calendar-toggle-button')).every((toggleButtonElement) => !composedPath.includes(toggleButtonElement));
    if (notToggleButton) {
      this.active = inDatepicker;
    }
  }
  onClickOutside() {
    this.active = false;
  }
  /*********  Event Handlers  **********/
  onInputFocusIn(event) {
    this.focusedField = this.getInputFieldFromEvent(event);
    if (!this.isSelectingRangeWithMouse) {
      // When focusing the input the Safari browser will fight for control of the cursor unless it is done asynchronously
      afterNextRenderTimeout(() => this.setRange());
    }
  }
  onInputFocusOut() {
    this.lastIntervalRange = this.initialIntervalRange;
  }
  onInputMouseUp(event) {
    event.preventDefault();
    this.lastIntervalRange = getIntervalRange(this.format, getIntervalLetter(this.format, this.focusedField.selectionStart));
    this.setRange();
    this.isSelectingRangeWithMouse = false;
  }
  /********  Other Methods  **********/
  isInputFieldEvent(event) {
    const composedPath = event.composedPath();
    return (composedPath.includes(this.inputElement) ||
      composedPath.includes(this.toInputElement));
  }
  get initialIntervalRange() {
    return getIntervalRange(this.format, getIntervalLetter(this.format, 0));
  }
  getInputFieldFromEvent(event) {
    const composedPath = event.composedPath();
    return composedPath[0];
  }
  updateIntervalValue(event) {
    const inputNumber = parseInt(event.key, 10);
    if (!isNaN(inputNumber)) {
      const currentSectionValue = this.focusedField.value.slice(this.focusedField.selectionStart, this.focusedField.selectionEnd);
      if (getIntervalLetter(this.format, this.focusedField.selectionStart) ===
        'y' &&
        this.yearFormat === 'yyyy') {
        this.typeYearValue(currentSectionValue, event.key);
      }
      else {
        if (this.canSetDate(inputNumber)) {
          this.updateSelection(this.focusedField, `${currentSectionValue[1]}${event.key}`);
          this.setValue();
        }
        else {
          this.updateSelection(this.focusedField, `0${event.key}`.replace('00', '01'));
          this.setValue();
        }
      }
    }
  }
  updateSelection(field, text) {
    field.value =
      field.value.substr(0, this.intervalRange.selectionStart) +
        text +
        field.value.substr(this.intervalRange.selectionEnd);
  }
  getCalendarLabels() {
    return getCalendarLabels(this.label, this.mode, [
      this.i18n('start'),
      this.i18n('end'),
      this.i18n('date')
    ]);
  }
  stringToDate(stringDate) {
    const formatSeparator = getFormatSeparator(this.format);
    const formatItems = this.format.toLowerCase().split(formatSeparator);
    const dateItems = stringDate.split(formatSeparator);
    const year = parseInt(dateItems[formatItems.indexOf(this.yearFormat)], 10);
    const month = parseInt(dateItems[formatItems.indexOf('mm')], 10) - 1;
    const day = parseInt(dateItems[formatItems.indexOf('dd')], 10);
    const date = new Date(year, month, day);
    if (this.yearFormat === 'yy' &&
      date.getFullYear() < 1970 &&
      this.lastYear > 1970) {
      date.setFullYear(date.getFullYear() + 100);
    }
    return date;
  }
  onCalendarSelect(inputEvent) {
    const calendar = inputEvent.target;
    this.value = calendar.value;
    inputEvent.stopPropagation(); // Don't let both events bubble.
    this.input.emit(this.value);
    this.updateDate();
    this.inputElement.value = this.formattedValue;
    if (this.mode === "range" /* CalendarModes.Range */) {
      this.toInputElement.value = this.toFormattedValue;
    }
    if (document.activeElement !== this.inputElement ||
      document.activeElement !== this.toInputElement) {
      this.active = false;
    }
  }
  setValue() {
    if (this.mode === "range" /* CalendarModes.Range */) {
      const fromValue = this.stringToDate(this.inputElement.value);
      const toValue = this.stringToDate(this.toInputElement.value);
      this.value = asIsoDateRange(fromValue, toValue);
      this.updateDate();
      void this.calendarElement.setValue([fromValue, toValue]);
    }
    else {
      const date = this.stringToDate(this.inputElement.value);
      this.value = asIsoDate(date);
      this.updateDate();
      void this.calendarElement.setValue(date);
    }
    this.input.emit(this.value);
  }
  setRange() {
    this.setIntervalRange(this.lastIntervalRange);
    this.setCursorRange();
  }
  typeYearValue(selection, key) {
    if (selection[0] !== ' ') {
      this.updateSelection(this.focusedField, `   ${key}`);
    }
    else {
      this.updateSelection(this.focusedField, `${selection.substr(1)}${key}`);
      if (!(selection.substr(1) + key).includes(' ')) {
        this.setValue();
      }
    }
  }
  canSetDate(key) {
    const newValue = parseInt([
      this.focusedField.value[this.intervalRange.selectionEnd - 1].toString(),
      key
    ].join(''), 10);
    if (newValue) {
      switch (getIntervalLetter(this.format, this.focusedField.selectionStart)) {
        case 'd': {
          const dateValue = fromIsoDate(this.value);
          if (newValue <=
            new Date(dateValue.getFullYear(), dateValue.getMonth() + 1, 0).getDate()) {
            return true;
          }
          break;
        }
        case 'm':
          if (newValue <= 12) {
            return true;
          }
          break;
        case 'y':
          return true;
      }
    }
    return false;
  }
  getMapAndRegexFromField(value) {
    const map = {
      dd: `0${value.getDate()}`.slice(-2),
      mm: `0${value.getMonth() + 1}`.slice(-2)
    };
    if (this.yearFormat === 'yyyy') {
      map.yyyy = value.getFullYear().toString();
    }
    else {
      map.yy = value.getFullYear().toString().slice(-2);
    }
    const regexp = new RegExp(Object.keys(map).join('|'), 'gi');
    return {
      map,
      regexp
    };
  }
  updateDate() {
    if (this.mode === "range" /* CalendarModes.Range */) {
      const [from, to] = fromIsoDateRange(this.value);
      const { map: map1, regexp: regexp1 } = this.getMapAndRegexFromField(from);
      this.formattedValue = this.format.replace(regexp1, match => {
        return map1[match];
      });
      const { map: map2, regexp: regexp2 } = this.getMapAndRegexFromField(to);
      this.toFormattedValue = this.format.replace(regexp2, match => {
        return map2[match];
      });
    }
    else {
      const dateValue = fromIsoDate(this.value);
      const { map: map3, regexp: regexp3 } = this.getMapAndRegexFromField(dateValue);
      this.formattedValue = this.format.replace(regexp3, match => {
        return map3[match];
      });
    }
  }
  /** Selects a range of the input text based on the intervalRange property. */
  setCursorRange() {
    if (this.intervalRange) {
      // If the selection is the same as what you are trying to set, setSelectionRange will deselect it.
      // To prevent this, the line below sets the selection to the full field before setting the range we actually want.
      this.focusedField.setSelectionRange(0, 100);
      // Select the range we want
      this.focusedField.setSelectionRange(this.intervalRange.selectionStart, this.intervalRange.selectionEnd);
    }
  }
  toggleCalendar() {
    this.active = !this.active;
    if (this.active) {
      afterNextRenderTimeout(() => {
        void this.calendarElement.focusPreviewDate();
      });
    }
  }
  setIntervalRange(intervalRange) {
    this.intervalRange = intervalRange;
  }
  getCombinedFocusedDateValue() {
    return this.mode === "range" /* CalendarModes.Range */
      ? this.getRangeFocusedDateValue()
      : this.getFocusedDateValue();
  }
  getFocusedDateValue() {
    return fromIsoDate(this.value);
  }
  getRangeFocusedDateValue() {
    const [start, end] = fromIsoDateRange(this.value);
    return this.focusedField === this.inputElement ? start : end;
  }
  increment(delta) {
    const interval = getIntervalLetter(this.format, this.focusedField.selectionStart);
    const focusedDateValue = this.getCombinedFocusedDateValue();
    let newDate;
    switch (interval) {
      case 'd':
        newDate = incrementDay(delta, focusedDateValue);
        break;
      case 'm':
        newDate = incrementMonth(delta, focusedDateValue);
        break;
      case 'y':
        newDate = incrementYear(delta, focusedDateValue);
        break;
    }
    if (isOutOfBoundsDate(newDate, this.minDateDate, this.maxDateDate)) {
      newDate = focusedDateValue;
    }
    this.lastYear = newDate.getFullYear();
    this.setIntervalRange({
      selectionStart: this.focusedField.selectionStart,
      selectionEnd: this.focusedField.selectionEnd
    });
    this.focusedField.value = getFormattedDate(newDate, this.format);
    this.setValue();
  }
  async componentWillLoad() {
    trackComponent(this.root, { variant: this.mode });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.watchMinDate(this.minDate);
    this.watchMaxDate(this.maxDate);
    this.watchFormat(this.format);
    if (!this.value) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (this.mode === "range" /* CalendarModes.Range */) {
        this.value = asIsoDateRange(now, now);
      }
      else {
        this.value = asIsoDate(now);
      }
      if (this.mode === "range" /* CalendarModes.Range */ && this.numberOfMonths < 2) {
        this.numberOfMonths = 2;
      }
    }
    this.updateDate();
  }
  runUpdatePosition() {
    this.cleanupUpdatePosition = autoUpdate(this.datepickerElement, this.calendarElement, () => this.updatePosition(), {
      ancestorScroll: true,
      elementResize: true,
      animationFrame: true,
      ancestorResize: true
    });
  }
  updatePosition() {
    void computePosition(this.datepickerElement, this.calendarElement, {
      strategy: 'fixed',
      placement: 'bottom-start',
      middleware: [
        offset({ crossAxis: -3 }),
        flip({
          fallbackStrategy: 'initialPlacement'
        })
      ]
    }).then(({ x, y }) => {
      Object.assign(this.calendarElement.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }
  componentDidUpdate() {
    if (this.active) {
      this.runUpdatePosition();
    }
    else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  disconnectedCallback() {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }
  renderCalendarToggleButton() {
    return (h("button", { class: "gux-calendar-toggle-button", type: "button", onClick: () => this.toggleCalendar(), "aria-expanded": this.active.toString(), "aria-label": this.i18n('toggleCalendar'), disabled: this.disabled }, h("gux-icon", { decorative: true, "icon-name": "calendar" })));
  }
  renderCalendar() {
    return (h("gux-calendar", { tabIndex: -1, ref: (el) => (this.calendarElement = el), value: this.value, mode: this.mode, onInput: (event) => this.onCalendarSelect(event), minDate: this.minDate, maxDate: this.maxDate, numberOfMonths: this.numberOfMonths, startDayOfWeek: this.startDayOfWeek }));
  }
  renderStartDateField() {
    return (h("div", { class: "gux-datepicker-field" }, h("label", { htmlFor: this.startInputId, class: {
        'gux-datepicker-field-label': true,
        'gux-sr-only': this.mode === "single" /* CalendarModes.Single */ && !this.label
      } }, this.getCalendarLabels()[0]), h("div", { class: "gux-datepicker-field-input" }, h("div", { class: "gux-datepicker-field-text-input" }, h("input", { id: this.startInputId, type: "text", onClick: e => this.onInputMouseUp(e), onFocusin: e => this.onInputFocusIn(e), onFocusout: () => this.onInputFocusOut(), ref: (el) => (this.inputElement = el), value: this.formattedValue, disabled: this.disabled }), this.renderCalendarToggleButton()), this.renderCalendar())));
  }
  renderEndDateField() {
    if (this.mode === "single" /* CalendarModes.Single */) {
      return null;
    }
    return (h("div", { class: "gux-datepicker-field" }, h("label", { htmlFor: this.endInputId, class: "gux-datepicker-field-label" }, this.getCalendarLabels()[1]), h("div", { class: "gux-datepicker-field-input" }, h("div", { class: "gux-datepicker-field-text-input" }, h("input", { id: this.endInputId, type: "text", ref: (el) => (this.toInputElement = el), onMouseUp: e => this.onInputMouseUp(e), onFocusin: e => this.onInputFocusIn(e), onFocusout: () => this.onInputFocusOut(), value: this.toFormattedValue, disabled: this.disabled }), this.renderCalendarToggleButton()))));
  }
  render() {
    return (h("div", { class: {
        'gux-datepicker': true,
        'gux-active': this.active,
        'gux-disabled': this.disabled
      }, ref: (el) => (this.datepickerElement = el) }, this.renderStartDateField(), this.renderEndDateField()));
  }
  static get is() { return "gux-datepicker"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["gux-datepicker.less"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gux-datepicker.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The datepicker current value"
        },
        "attribute": "value",
        "reflect": false
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The datepicker label (can be a single label, or two separated by a comma if it's a range datepicker)"
        },
        "attribute": "label",
        "reflect": false,
        "defaultValue": "''"
      },
      "numberOfMonths": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The datepicker number of months displayed"
        },
        "attribute": "number-of-months",
        "reflect": false,
        "defaultValue": "1"
      },
      "startDayOfWeek": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "GuxCalendarDayOfWeek",
          "resolved": "0 | 1 | 2 | 3 | 4 | 5 | 6 | 7",
          "references": {
            "GuxCalendarDayOfWeek": {
              "location": "import",
              "path": "../gux-calendar/gux-calendar.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The day of the week to start each calendar row. 1 - Monday, 2 - Tuesday, ... 7 - Sunday"
        },
        "attribute": "start-day-of-week",
        "reflect": false
      },
      "minDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The min date selectable"
        },
        "attribute": "min-date",
        "reflect": false,
        "defaultValue": "''"
      },
      "maxDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The max date selectable"
        },
        "attribute": "max-date",
        "reflect": false,
        "defaultValue": "''"
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "GuxDatepickerMode",
          "resolved": "CalendarModes.Range | CalendarModes.Single",
          "references": {
            "GuxDatepickerMode": {
              "location": "import",
              "path": "./gux-datepicker.types"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The calendar mode (can be single or range)"
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "CalendarModes.Single"
      },
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The datepicker date format (default to mm/dd/yyyy, or specified)"
        },
        "attribute": "format",
        "reflect": false,
        "defaultValue": "'mm/dd/yyyy'"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Disable the input and prevent interactions."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "formattedValue": {},
      "minDateDate": {},
      "maxDateDate": {},
      "toFormattedValue": {},
      "active": {}
    };
  }
  static get events() {
    return [{
        "method": "input",
        "name": "input",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Triggered when user selects a date"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "root"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "watchValue"
      }, {
        "propName": "minDate",
        "methodName": "watchMinDate"
      }, {
        "propName": "maxDate",
        "methodName": "watchMaxDate"
      }, {
        "propName": "format",
        "methodName": "watchFormat"
      }, {
        "propName": "active",
        "methodName": "watchActiveCalendar"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "onKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }, {
        "name": "mousedown",
        "method": "onMouseDown",
        "target": undefined,
        "capture": false,
        "passive": true
      }];
  }
}
__decorate([
  OnClickOutside({ triggerEvents: 'mousedown' })
], GuxDatepicker.prototype, "onClickOutside", null);
