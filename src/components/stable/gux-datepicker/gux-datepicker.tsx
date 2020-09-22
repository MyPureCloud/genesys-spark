import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
  Watch
} from '@stencil/core';
import { CalendarModes, KeyCode } from '../../../common-enums';
import {
  asIsoDateRange,
  asIsoDateString,
  fromIsoDateRange,
  fromIsoDateString
} from '../../../common-utils';
import { buildI18nForComponent } from '../../../i18n';
import i18nStrings from './i18n/en.json';

@Component({
  styleUrl: 'gux-datepicker.less',
  tag: 'gux-datepicker'
})
export class GuxDatepicker {
  @Element()
  root: HTMLGuxDatepickerElement;
  /**
   * The datepicker current value
   */
  @Prop({ mutable: true })
  value: string;
  /**
   * The datepicker label (can be a single label, or an array of two if it's a range datepicker)
   */
  @Prop()
  label: string | string[] = '';
  /**
   * The datepicker number of months displayed
   */
  @Prop({ mutable: true })
  numberOfMonths: number = 1;
  /**
   * The datepicker current value
   */
  @State()
  formatedValue: string = '';
  /**
   * The datepicker current value
   */
  @State()
  toFormatedValue: string = '';

  /**
   * The min date selectable
   */
  @Prop()
  minDate: string = '';

  /**
   * The max date selectable
   */
  @Prop()
  maxDate: string = '';

  /**
   * The calendar mode (can be single or range)
   */
  @Prop()
  mode: string = CalendarModes.Single;
  /**
   * The datepicker date format (default to mm/dd/yyyy, or specified)
   */
  @Prop()
  format: string = 'mm/dd/yyyy';
  /**
   * The datepicker first week day (default to 0 (sunday))
   */
  @Prop()
  firstDayOfWeek: number = 0;

  @State()
  active: boolean = false;

  yearFormat: string = 'yyyy';
  sepArr: string[];

  textFieldElement: HTMLGuxTextFieldElement;
  toTextFieldElement: HTMLGuxTextFieldElement;
  inputElement: HTMLInputElement;
  toInputElement: HTMLInputElement;
  calendarElement: HTMLGuxCalendarElement;
  fieldDatepickerElement: HTMLDivElement;
  selectionRange: number[];
  focusingRange: boolean = false;
  focusedField: HTMLInputElement;

  isSelectingRange: boolean = false;
  lastSelection: number = 0;
  lastYear: number = new Date().getFullYear();

  i18n: (resourceKey: string, context?: any) => string;

  /**
   * Triggered when user selects a date
   */
  @Event()
  input: EventEmitter<string>;

  get calendarLabels() {
    const labels: string[] = [].concat(this.label || []);
    if (this.mode === CalendarModes.Range) {
      return [labels[0] || this.i18n('start'), labels[1] || this.i18n('end')];
    } else {
      return [labels[0]];
    }
  }

  replaceUndefinedChars() {
    this.inputElement.value = this.inputElement.value.replace(/ /g, '0');
    this.inputElement.value = this.inputElement.value.replace(/00/g, '01');
    if (this.toInputElement) {
      this.toInputElement.value = this.toInputElement.value.replace(/ /g, '0');
      this.toInputElement.value = this.toInputElement.value.replace(
        /00/g,
        '01'
      );
    }
  }

  stringToDate(stringDate) {
    const formatItems = this.format.toLowerCase().split('/');
    const dateItems = stringDate.split('/');
    const year = dateItems[formatItems.indexOf(this.yearFormat)];
    const month = parseInt(dateItems[formatItems.indexOf('mm')], 10) - 1;
    const date = new Date(year, month, dateItems[formatItems.indexOf('dd')]);
    if (
      this.yearFormat === 'yy' &&
      date.getFullYear() < 1970 &&
      this.lastYear > 1970
    ) {
      date.setFullYear(date.getFullYear() + 100);
    }
    return date;
  }

  onCalendarSelect(inputEvent: Event) {
    const calendar = inputEvent.target as HTMLGuxCalendarElement;
    this.value = calendar.value;
    inputEvent.stopPropagation(); // Don't let both events bubble.
    this.input.emit(this.value);
    this.updateDate();
    this.inputElement.value = this.formatedValue;
    if (this.mode === CalendarModes.Range) {
      this.toInputElement.value = this.toFormatedValue;
    }
    if (
      document.activeElement !== this.inputElement ||
      document.activeElement !== this.toInputElement
    ) {
      this.active = false;
    }
  }

  outOfBounds(date: Date): boolean {
    return (
      (this.maxDate !== '' && fromIsoDateString(this.maxDate) < date) ||
      (this.minDate !== '' && fromIsoDateString(this.minDate) > date)
    );
  }

  setValue() {
    this.replaceUndefinedChars();

    if (this.mode === CalendarModes.Range) {
      const fromValue = this.stringToDate(this.inputElement.value);
      const toValue = this.stringToDate(this.toInputElement.value);
      this.value = asIsoDateRange(fromValue, toValue);
      this.updateDate();
      this.calendarElement.setValue([fromValue, toValue]);
    } else {
      const date = this.stringToDate(this.inputElement.value);
      this.value = asIsoDateString(date);
      this.updateDate();
      this.calendarElement.setValue(date);
    }
    this.input.emit(this.value);
  }

  getPreviousSep(sep: string) {
    if (this.sepArr[this.sepArr.indexOf(sep) - 1]) {
      return this.sepArr[this.sepArr.indexOf(sep) - 1];
    } else {
      return this.sepArr[2];
    }
  }
  getNextSep(sep: string) {
    if (this.sepArr[this.sepArr.indexOf(sep) + 1]) {
      return this.sepArr[this.sepArr.indexOf(sep) + 1];
    } else {
      return this.sepArr[0];
    }
  }

  @Listen('keydown', { passive: false })
  onKeyDown(e: KeyboardEvent) {
    if (e.target === this.inputElement || e.target === this.toInputElement) {
      this.focusedField = e.target as HTMLInputElement;
      switch (e.keyCode) {
        case KeyCode.Enter:
        case KeyCode.Esc:
          this.focusedField.blur();
          this.active = false;
          break;
        case KeyCode.Tab:
          if (!e.shiftKey) {
            e.preventDefault();
            this.calendarElement.focusPreviewDate();
          }
          break;
        case KeyCode.Down:
          e.preventDefault();
          this.increment(-1);
          this.setCursorRange();
          break;
        case KeyCode.Up:
          e.preventDefault();
          this.increment(1);
          this.setCursorRange();
          break;
        case KeyCode.Left:
          e.preventDefault();
          this.setSelectionRange(
            this.format.indexOf(
              this.getPreviousSep(this.format[this.selectionRange[0]])
            )
          );
          this.setCursorRange();
          break;
        case KeyCode.Right:
          e.preventDefault();
          this.setSelectionRange(
            this.format.indexOf(
              this.getNextSep(this.format[this.selectionRange[0]])
            )
          );
          this.setCursorRange();
          break;
        default:
          const inputNumber = parseInt(e.key, 10);
          const selectionStart = this.focusedField.selectionStart;
          if (!isNaN(inputNumber)) {
            const currentSectionValue = this.focusedField.value.slice(
              this.focusedField.selectionStart,
              this.focusedField.selectionEnd
            );
            if (
              this.format[this.selectionRange[0]] === 'y' &&
              this.yearFormat === 'yyyy'
            ) {
              this.typeYearValue(currentSectionValue, e.key);
            } else {
              if (!this.canSetDate(inputNumber)) {
                this.focusedField.value =
                  this.focusedField.value.substr(0, this.selectionRange[0]) +
                  '0' +
                  e.key +
                  this.focusedField.value.substr(this.selectionRange[1]);
                this.setValue();
              } else {
                this.focusedField.value =
                  this.focusedField.value.substr(0, this.selectionRange[0]) +
                  currentSectionValue[1] +
                  e.key +
                  this.focusedField.value.substr(this.selectionRange[1]);
                this.setValue();
              }
            }
          }
          this.setSelectionRange(selectionStart);
          this.setCursorRange();
          e.preventDefault();
          break;
      }
    }
  }

  @Listen('focusin')
  onFocusIn(e: FocusEvent) {
    if (e.target === this.inputElement || e.target === this.toInputElement) {
      if (!this.isSelectingRange) {
        this.focusedField = e.target as HTMLInputElement;
        this.setRange();
      }
    }
  }

  @Listen('focusout')
  onFocusOut(e: FocusEvent) {
    if (!this.root.contains(e.relatedTarget as Node)) {
      this.active = false;
    }
  }

  @Listen('mousedown')
  onMouseDown(e: MouseEvent) {
    if (e.target === this.inputElement || e.target === this.toInputElement) {
      this.isSelectingRange = true;
    }
  }

  @Listen('mouseup', { passive: false })
  onMouseUp(e: MouseEvent) {
    e.preventDefault();
    if (
      this.isSelectingRange &&
      (e.target === this.inputElement || e.target === this.toInputElement)
    ) {
      this.focusedField = e.target as HTMLInputElement;
      this.lastSelection = this.focusedField.selectionStart;
      this.setRange();
    }
  }

  setRange() {
    this.active = true;
    this.isSelectingRange = false;
    this.setSelectionRange(this.lastSelection);
    this.setCursorRange();
  }

  typeYearValue(selection: string, key: string) {
    if (selection[0] !== ' ') {
      this.focusedField.value =
        this.focusedField.value.substr(0, this.selectionRange[0]) +
        '   ' +
        key +
        this.focusedField.value.substr(this.selectionRange[1]);
    } else {
      this.focusedField.value =
        this.focusedField.value.substr(0, this.selectionRange[0]) +
        selection.substr(1) +
        key +
        this.focusedField.value.substr(this.selectionRange[1]);
      if (!(selection.substr(1) + key).includes(' ')) {
        this.setValue();
      }
    }
  }

  canSetDate(key: number) {
    const newValue = parseInt(
      [
        this.focusedField.value[this.selectionRange[1] - 1].toString(),
        key
      ].join(''),
      10
    );
    if (newValue) {
      switch (this.format[this.selectionRange[0]]) {
        case 'd':
          // TODO check depending on focusedField
          const dateValue = fromIsoDateString(this.value);
          if (
            newValue <=
            new Date(
              dateValue.getFullYear(),
              dateValue.getMonth() + 1,
              0
            ).getDate()
          ) {
            return true;
          }
          return false;
        case 'm':
          if (newValue <= 12) {
            return true;
          }
          return false;
        case 'y':
          return true;
      }
    }
    return false;
  }

  getMapAndRegexFromField(value: Date) {
    const map: any = {
      dd: `0${value.getDate()}`.slice(-2),
      mm: `0${value.getMonth() + 1}`.slice(-2)
    };
    if (this.yearFormat === 'yyyy') {
      map.yyyy = value.getFullYear().toString();
    } else {
      map.yy = value.getFullYear().toString().slice(-2);
    }
    const regexp = new RegExp(Object.keys(map).join('|'), 'gi');
    return {
      map,
      regexp
    };
  }

  updateDate() {
    if (this.mode === CalendarModes.Range) {
      const [from, to] = fromIsoDateRange(this.value);
      const { map: map1, regexp: regexp1 } = this.getMapAndRegexFromField(from);
      this.formatedValue = this.format.replace(regexp1, match => {
        return map1[match];
      });
      const { map: map2, regexp: regexp2 } = this.getMapAndRegexFromField(to);
      this.toFormatedValue = this.format.replace(regexp2, match => {
        return map2[match];
      });
    } else {
      const dateValue = fromIsoDateString(this.value);
      const { map: map3, regexp: regexp3 } = this.getMapAndRegexFromField(
        dateValue
      );
      this.formatedValue = this.format.replace(regexp3, match => {
        return map3[match];
      });
    }
  }

  setCursorRange() {
    if (this.selectionRange) {
      this.focusedField.setSelectionRange(
        this.selectionRange[0],
        this.selectionRange[1]
      );
    }
  }

  toggleCalendar() {
    this.active = !this.active;
    if (this.active) {
      // Wait for render before focusing preview date
      setTimeout(() => {
        this.calendarElement.focusPreviewDate();
      });
    }
  }

  @Watch('value')
  watchValue() {
    this.updateDate();
  }

  setSelectionRange(index: number) {
    let sep = this.format[index];
    if (!sep || sep === '/') {
      sep = this.format[index - 1];
    }
    const first = this.format.indexOf(sep);
    const last = this.format.lastIndexOf(sep) + 1;
    this.selectionRange = [first, last];
    return sep;
  }

  getRefValue(): Date {
    if (this.mode === CalendarModes.Range) {
      const [start, end] = fromIsoDateRange(this.value);
      return this.focusedField === this.inputElement ? start : end;
    } else {
      return fromIsoDateString(this.value);
    }
  }

  increment(value: number) {
    let selectionText = document.getSelection().toString();
    const type = this.setSelectionRange(this.focusedField.selectionStart);
    const refValue = this.getRefValue();

    switch (type) {
      case 'd':
        selectionText = this.incrementDay(value, refValue);
        break;
      case 'm':
        selectionText = this.incrementMonth(value, refValue);
        break;
      case 'y':
        selectionText = this.incrementYear(value, refValue);
        break;
    }

    this.focusedField.value =
      this.focusedField.value.substr(0, this.selectionRange[0]) +
      selectionText +
      this.focusedField.value.substr(this.selectionRange[1]);

    this.setValue();
  }

  incrementDay(value: number, ref: Date): string {
    let newDay = new Date(ref.valueOf());
    newDay.setDate(newDay.getDate() + value);

    if (value < 0) {
      if (newDay.getDate() > ref.getDate()) {
        newDay = new Date(ref.getFullYear(), ref.getMonth() + 1, 0, 0, 0, 0);
      }
    } else {
      if (newDay.getDate() < ref.getDate()) {
        newDay.setMonth(newDay.getMonth() - 1);
      }
    }

    // Reset date if out of bounds
    if (this.outOfBounds(newDay)) {
      newDay = ref;
    }

    return `0${newDay.getDate().toString()}`.slice(-2);
  }

  incrementMonth(value: number, ref: Date): string {
    let newMonth = new Date(ref.valueOf());
    newMonth.setMonth(newMonth.getMonth() + value);

    if (value < 0) {
      if (newMonth.getMonth() > ref.getMonth()) {
        newMonth.setFullYear(newMonth.getFullYear() + 1);
      }
    } else {
      if (newMonth.getMonth() < ref.getMonth()) {
        newMonth.setFullYear(newMonth.getFullYear() - 1);
      }
    }

    // Reset date if out of bounds
    if (this.outOfBounds(newMonth)) {
      newMonth = ref;
    }

    return `0${(newMonth.getMonth() + 1).toString()}`.slice(-2);
  }

  incrementYear(value: number, ref: Date): string {
    let newYear = new Date(ref.valueOf());
    newYear.setFullYear(ref.getFullYear() + value);
    this.lastYear = newYear.getFullYear();

    // Reset date if out of bounds
    if (this.outOfBounds(newYear)) {
      newYear = ref;
    }

    if (this.yearFormat === 'yyyy') {
      return newYear.getFullYear().toString();
    } else {
      return newYear.getFullYear().toString().slice(-2);
    }
  }

  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, i18nStrings);

    if (!this.value) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (this.mode === CalendarModes.Range) {
        this.value = asIsoDateRange(now, now);
      } else {
        this.value = asIsoDateString(now);
      }
      if (this.mode === CalendarModes.Range && this.numberOfMonths < 2) {
        this.numberOfMonths = 2;
      }
    }
  }

  componentDidLoad() {
    this.inputElement = this.textFieldElement.querySelector('input');
    if (this.mode === CalendarModes.Range) {
      this.toInputElement = this.toTextFieldElement.querySelector('input');
    }
    if (!this.format.includes('yyyy')) {
      this.yearFormat = 'yy';
    }
    this.sepArr = [];
    this.format.split('/').map(sep => {
      this.sepArr.push(sep[0]);
    });
    this.updateDate();
  }

  render() {
    return (
      <div class={`gux-datepicker ${this.active ? 'active' : ''}`}>
        <div
          class="gux-datepicker-field"
          ref={(el: HTMLDivElement) => (this.fieldDatepickerElement = el)}
        >
          <gux-text-label label={this.calendarLabels[0]} position="beside">
            <gux-text-field
              type="text"
              ref={(el: HTMLGuxTextFieldElement) =>
                (this.textFieldElement = el)
              }
              value={this.formatedValue}
            >
              <button
                aria-hidden="true"
                type="button"
                onClick={() => {
                  this.toggleCalendar();
                }}
                tabindex="-1"
              >
                <gux-icon decorative iconName="ic-calendar-generic"></gux-icon>
              </button>
              <gux-calendar
                ref={(el: HTMLGuxCalendarElement) =>
                  (this.calendarElement = el)
                }
                value={this.value}
                mode={this.mode}
                onInput={(e: CustomEvent) => this.onCalendarSelect(e)}
                minDate={this.minDate}
                maxDate={this.maxDate}
                firstDayOfWeek={this.firstDayOfWeek}
                numberOfMonths={this.numberOfMonths}
              />
            </gux-text-field>
          </gux-text-label>
        </div>
        {this.mode === CalendarModes.Range && (
          <div
            class="gux-datepicker-field"
            ref={(el: HTMLDivElement) => (this.fieldDatepickerElement = el)}
          >
            <gux-text-label label={this.calendarLabels[1]} position="beside">
              <gux-text-field
                type="text"
                ref={(el: HTMLGuxTextFieldElement) =>
                  (this.toTextFieldElement = el)
                }
                value={this.toFormatedValue}
              >
                <button
                  aria-hidden="true"
                  type="button"
                  onClick={() => {
                    this.toggleCalendar();
                  }}
                  tabindex="-1"
                >
                  <gux-icon
                    decorative
                    iconName="ic-calendar-generic"
                  ></gux-icon>
                </button>
              </gux-text-field>
            </gux-text-label>
          </div>
        )}
      </div>
    );
  }
}
