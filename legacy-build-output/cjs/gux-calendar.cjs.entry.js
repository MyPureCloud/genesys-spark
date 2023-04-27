'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d3bc59d7.js');
const afterNextRender = require('./after-next-render-a09f528a.js');
const isoDates = require('./iso-dates-f78ffb80.js');
const usage = require('./usage-da9572bf.js');
const index$1 = require('./index-c4441830.js');
const capitalizeFirstLetter = require('./capitalize-first-letter-8e2f04e5.js');
require('./get-closest-element-ab4b2eee.js');

function addClassToElements(elements, className) {
  manipulateElementsClasses(elements, 'add', className);
}
function removeClassToElements(elements, className) {
  manipulateElementsClasses(elements, 'remove', className);
}
function manipulateElementsClasses(elements = [], action, className) {
  const arr = [].concat(elements);
  for (const el of arr) {
    el.classList[action](className);
  }
}

function firstDateInMonth(month, year, startDayOfWeek) {
  const startDate = new Date(year, month, 1, 1, 0, 0, 0);
  const firstDayOfMonth = startDate.getDay();
  const firstDayOffset = (-1 * (startDayOfWeek - firstDayOfMonth - 7)) % 7;
  return new Date(startDate.getTime() - firstDayOffset * (86400 * 1000));
}
function getWeekdays(locale, startDayOfWeek) {
  const days = [];
  // Sunday
  const day = new Date(1970, 0, 4);
  for (let i = 0; i < 7; i++) {
    const weekday = day.toLocaleString(locale, { weekday: 'narrow' });
    days.push(weekday);
    day.setDate(day.getDate() + 1);
  }
  return shiftArray(days, startDayOfWeek);
}
function shiftArray(arr, n) {
  const times = n > arr.length ? n % arr.length : n;
  return arr.concat(arr.splice(0, times));
}
function getOffsetMonthDate(baseDate, monthDelta) {
  const date = new Date(baseDate);
  date.setDate(1);
  date.setMonth(date.getMonth() + monthDelta);
  return date;
}
function getDateMonthAndYearString(date, locale) {
  return capitalizeFirstLetter.capitalizeFirstLetter(date.toLocaleDateString(locale, { year: 'numeric', month: 'long' }));
}

const guxCalendarCss = ":host{display:inline-block}.gux-calendar{margin-top:2px;border:1px solid #b4bccb;border-radius:4px}.gux-calendar .gux-header{position:relative;display:flex;align-items:center;justify-content:space-between;height:16px;padding:16px;color:#fdfdfd;background-color:#2a60c8;border-top-left-radius:3px;border-top-right-radius:3px}.gux-calendar .gux-header button{position:absolute;padding:5px;color:#fdfdfd;cursor:pointer;background:none;border:none;outline:none}.gux-calendar .gux-header button:focus-visible{outline:#75a8ff auto 5px}.gux-calendar .gux-header button.gux-left{left:18px}.gux-calendar .gux-header button.gux-right{right:18px}.gux-calendar .gux-header button gux-icon{width:16px;height:16px;pointer-events:none}.gux-calendar .gux-header .gux-month-list{display:flex;justify-content:space-between;width:100%}.gux-calendar .gux-header .gux-month-list label{width:100%;text-align:center;font-size:12px;line-height:20px;font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-calendar .gux-content{display:flex;align-items:flex-start;padding:20px 24px;color:#2e394c;background-color:#fdfdfd;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.gux-calendar .gux-content table{width:168px;text-align:left;table-layout:fixed;border-spacing:0;-ms-user-select:none;user-select:none}.gux-calendar .gux-content table:not(:last-child){padding-right:24px}.gux-calendar .gux-content table tr{height:28px}.gux-calendar .gux-content table tr:empty{display:none}.gux-calendar .gux-content table tr th,.gux-calendar .gux-content table tr td{width:28px;height:28px;padding:0;margin:0;text-align:center;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px}.gux-calendar .gux-content table tr th{font-family:Roboto, sans-serif;font-weight:400;font-weight:700}.gux-calendar .gux-content table tr td{cursor:pointer}.gux-calendar .gux-content table tr td.gux-hovered{background-color:#deeaff}.gux-calendar .gux-content table tr td.gux-selected{color:#fdfdfd;background-color:#2a60c8;border-radius:4px}.gux-calendar .gux-content table tr td.gux-selected.gux-start-date{border-radius:4px 0 0 4px}.gux-calendar .gux-content table tr td.gux-selected.gux-end-date{border-radius:0 4px 4px 0}.gux-calendar .gux-content table tr td:hover:not(.gux-calendar .gux-content table tr td.gux-start-date):not(.gux-calendar .gux-content table tr td.gux-end-date){color:#fdfdfd;background-color:#2a60c8;border-radius:4px}.gux-calendar .gux-content table tr td.gux-disabled{color:rgba(46, 57, 76, 0.5);pointer-events:none}.gux-calendar .gux-content table tr td.gux-not-in-month{color:rgba(107, 117, 133, 0.5)}.gux-calendar .gux-content table tr td.gux-not-in-month:hover{color:#2e394c;background-color:#e2e6ee}.gux-calendar .gux-content table tr td.gux-not-in-month.gux-hidden{visibility:hidden}.gux-sr-only{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxCalendar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.input = index.createEvent(this, "input", 7);
    this.locale = 'en';
    this.value = '';
    this.minDate = '';
    this.maxDate = '';
    this.mode = "single" /* CalendarModes.Single */;
    this.numberOfMonths = 1;
    this.startDayOfWeek = undefined;
    this.previewValue = new Date();
    this.selectingDate = null;
  }
  emitInput() {
    this.input.emit(this.value);
  }
  /**
   * Sets new value and rerender the calendar
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async setValue(value) {
    if (this.mode === "range" /* CalendarModes.Range */ && value instanceof Array) {
      const [date1, date2] = value;
      this.value = isoDates.asIsoDateRange(date1, date2); // sorts
      this.previewValue = isoDates.fromIsoDateRange(this.value)[0];
    }
    else {
      const selected = value;
      this.value = isoDates.asIsoDate(selected);
      this.previewValue = selected;
    }
  }
  /**
   * Focus the preview date
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async focusPreviewDate() {
    const target = this.root.shadowRoot.querySelector(`td[data-date="${this.previewValue.getTime()}"]`);
    if (target) {
      target.focus();
    }
  }
  /**
   * Reset calendar view to show first selected date
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async resetCalendarView(value) {
    this.previewValue = value;
  }
  incrementPreviewDateByMonth(increment) {
    this.previewValue = new Date(this.previewValue.getFullYear(), this.previewValue.getMonth() + increment, 15, // Don't use the day from the old value, because we'll skip a month on the 31st
    0, 0, 0);
    // Wait for render before focusing preview date
    afterNextRender.afterNextRenderTimeout(() => {
      void this.focusPreviewDate();
    });
  }
  async setValueAndEmit(value) {
    await this.setValue(value);
    this.emitInput();
  }
  outOfBounds(date) {
    return ((this.maxDate !== '' && isoDates.fromIsoDate(this.maxDate) < date) ||
      (this.minDate !== '' && isoDates.fromIsoDate(this.minDate) > date));
  }
  generateDatesFrom(month, startDate, length) {
    const arr = [];
    const currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0, 0);
    for (let i = 0; i < length; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
      const classes = [];
      let disabled = false;
      let hidden = false;
      if (date.getMonth() !== month) {
        classes.push('gux-not-in-month');
        disabled = true;
        if (this.mode === "range" /* CalendarModes.Range */) {
          classes.push('gux-hidden');
          hidden = true;
        }
      }
      if (this.outOfBounds(date)) {
        classes.push('gux-disabled');
        disabled = true;
      }
      let isSelected = false;
      if (this.mode === "range" /* CalendarModes.Range */) {
        const [start, end] = isoDates.fromIsoDateRange(this.value);
        const fromTimeStamp = start.getTime();
        const toTimeStamp = end.getTime();
        if (date.getTime() === fromTimeStamp) {
          isSelected = true;
          classes.push('gux-selected');
          classes.push('gux-start-date');
        }
        else if (date.getTime() === toTimeStamp) {
          isSelected = true;
          classes.push('gux-selected');
          classes.push('gux-end-date');
        }
      }
      else {
        const selectedTimestamp = isoDates.fromIsoDate(this.value).getTime();
        if (date.getTime() === selectedTimestamp) {
          isSelected = true;
          classes.push('gux-selected');
        }
      }
      arr.push({
        class: classes.join(' '),
        date,
        hidden,
        disabled,
        selected: isSelected
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return arr;
  }
  create2DArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < chunkSize - 1; i++) {
      const week = arr.slice(i * chunkSize, i * chunkSize + chunkSize);
      if (this.weekShouldBeDisplayed(week)) {
        result.push(week);
      }
    }
    return result;
  }
  isFocusableDate(day) {
    return day.selected || this.previewValue.getTime() === day.date.getTime();
  }
  weekShouldBeDisplayed(week) {
    const hasNonHiddenDate = week.find(date => {
      return !date.hidden;
    });
    return week.length && !!hasNonHiddenDate;
  }
  getMonthDays(index) {
    const month = new Date(this.previewValue.getTime());
    month.setDate(1);
    month.setMonth(month.getMonth() + index);
    const monthIndex = month.getMonth();
    const year = month.getFullYear();
    const startDate = firstDateInMonth(monthIndex, year, this.startDayOfWeek);
    const datesArray = this.generateDatesFrom(monthIndex, startDate, 42);
    return this.create2DArray(datesArray, 7);
  }
  addDays(date, days) {
    const newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
  getAllDatesElements() {
    const targets = this.root.shadowRoot.querySelectorAll('td');
    return Array.from(targets);
  }
  getAllSelectableDatesElements() {
    const targets = this.root.shadowRoot.querySelectorAll('td[tabindex="0"]');
    return Array.from(targets);
  }
  getRangeDatesElements(from, to) {
    const elements = [];
    let rangeDates;
    if (to < from) {
      rangeDates = this.getRangeDates(to, from);
    }
    else {
      rangeDates = this.getRangeDates(from, to);
    }
    for (const date of rangeDates) {
      const target = this.root.shadowRoot.querySelector(`td[data-date="${date.getTime()}"]:not(.gux-hidden)`);
      if (target) {
        elements.push(target);
      }
    }
    return elements;
  }
  getRangeDates(from, to) {
    const array = [];
    let currentDate = from;
    while (currentDate <= to) {
      array.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return array;
  }
  async onDateClick(date) {
    if (!this.outOfBounds(date)) {
      if (this.mode !== "range" /* CalendarModes.Range */) {
        await this.setValueAndEmit(date);
      }
      else {
        if (this.selectingDate === null) {
          // First click
          removeClassToElements(this.getAllDatesElements(), 'gux-hovered');
          this.selectingDate = new Date(date.valueOf());
          this.value = isoDates.asIsoDateRange(date, date);
        }
        else {
          // Second click
          const target = this.root.shadowRoot.querySelector(`td[data-date="${date.getTime()}"]`);
          if (target) {
            target.classList.add('gux-selected');
          }
          this.updateRangeElements();
          await this.setValueAndEmit([this.selectingDate, date]);
          this.previewValue = date;
          this.selectingDate = null;
        }
      }
    }
  }
  onDateMouseEnter(date) {
    if (this.mode === "range" /* CalendarModes.Range */ && this.selectingDate !== null) {
      this.value = isoDates.asIsoDateRange(date, this.selectingDate);
      this.updateRangeElements();
    }
  }
  updateRangeElements() {
    if (this.mode === "range" /* CalendarModes.Range */) {
      removeClassToElements(this.getAllDatesElements(), 'gux-hovered');
      const [start, end] = isoDates.fromIsoDateRange(this.value);
      const rangeElements = this.getRangeDatesElements(start, end);
      addClassToElements(rangeElements, 'gux-hovered');
    }
  }
  async onKeyDown(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        await this.onDateClick(this.previewValue);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() + 7));
        this.onDateMouseEnter(this.previewValue);
        afterNextRender.afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() - 7));
        this.onDateMouseEnter(this.previewValue);
        afterNextRender.afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() - 1));
        this.onDateMouseEnter(this.previewValue);
        afterNextRender.afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.previewValue = new Date(this.previewValue.setDate(this.previewValue.getDate() + 1));
        this.onDateMouseEnter(this.previewValue);
        afterNextRender.afterNextRenderTimeout(() => {
          void this.focusPreviewDate();
        });
        break;
      case 'PageUp':
        this.incrementPreviewDateByMonth(1);
        this.onDateMouseEnter(this.previewValue);
        break;
      case 'PageDown':
        this.incrementPreviewDateByMonth(-1);
        this.onDateMouseEnter(this.previewValue);
        break;
    }
  }
  componentWillLoad() {
    usage.trackComponent(this.root, { variant: this.mode });
    this.locale = index$1.getDesiredLocale(this.root);
    this.startDayOfWeek = this.startDayOfWeek || index$1.getStartOfWeek(this.locale);
    if (!this.value) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (this.mode === "range" /* CalendarModes.Range */) {
        this.value = isoDates.asIsoDateRange(now, now);
      }
      else {
        this.value = isoDates.asIsoDate(now);
      }
    }
    this.previewValue = isoDates.fromIsoDate(this.value);
  }
  componentDidRender() {
    this.updateRangeElements();
  }
  renderMonthHeader() {
    return (index.h("div", { class: "gux-month-list" }, Array.from(Array(this.numberOfMonths).keys()).map(index$1 => {
      const offsetMonthDate = getOffsetMonthDate(this.previewValue, index$1);
      return (index.h("label", null, getDateMonthAndYearString(offsetMonthDate, this.locale)));
    })));
  }
  renderCalendarTable(index$1) {
    return (index.h("table", null, index.h("tr", null, getWeekdays(this.locale, this.startDayOfWeek).map(day => (index.h("th", null, day)))), this.getMonthDays(index$1).map(week => (index.h("tr", null, week.map(day => (index.h("td", { tabindex: this.isFocusableDate(day) ? '0' : '-1', class: day.class, "aria-hidden": day.hidden ? 'true' : 'false', "aria-disabled": day.disabled ? 'true' : 'false', "data-date": day.date.getTime(), onClick: () => void this.onDateClick(day.date), onMouseEnter: () => this.onDateMouseEnter(day.date), onKeyDown: e => void this.onKeyDown(e) }, day.date.getDate(), index.h("span", { class: "gux-sr-only" }, getDateMonthAndYearString(day.date, this.locale))))))))));
  }
  render() {
    return (index.h("div", { class: "gux-calendar" }, index.h("div", { class: "gux-header" }, index.h("button", { type: "button", class: "gux-left", onClick: () => this.incrementPreviewDateByMonth(-1), tabindex: "-1", "aria-hidden": "true" }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-left" })), this.renderMonthHeader(), index.h("button", { type: "button", class: "gux-right", onClick: () => this.incrementPreviewDateByMonth(1), tabindex: "-1", "aria-hidden": "true" }, index.h("gux-icon", { decorative: true, "icon-name": "chevron-small-right" }))), index.h("div", { class: "gux-content" }, Array.from(Array(this.numberOfMonths).keys()).map(index => this.renderCalendarTable(index)))));
  }
  get root() { return index.getElement(this); }
};
GuxCalendar.style = guxCalendarCss;

exports.gux_calendar = GuxCalendar;
