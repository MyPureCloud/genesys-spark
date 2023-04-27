import { r as registerInstance, h, g as getElement } from './index-816e34d8.js';
import { b as buildI18nForComponent } from './index-fbebbbd0.js';
import { r as randomHTMLId } from './random-html-id-8e3f658c.js';
import { a as onDisabledChange } from './on-attribute-change-5fd8da7c.js';
import { s as setInputValue } from './set-input-value-5adeaccc.js';
import { s as simulateNativeEvent } from './simulate-native-event-ac69961f.js';
import { c as createCommonjsModule, a as commonjsGlobal } from './_commonjsHelpers-5ec8f9b7.js';
import './get-closest-element-1597503c.js';

const guxInputCheckboxCss = "gux-input-checkbox{display:block;color:#2e394c}gux-input-checkbox .gux-input-checkbox-container{position:relative;padding-left:24px;line-height:24px}gux-input-checkbox input{position:absolute;z-index:-1;opacity:0}gux-input-checkbox label{display:inline-block;font-size:12px}gux-input-checkbox label:hover{cursor:pointer}gux-input-checkbox label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:15%}gux-input-checkbox input:focus-visible~label::after{box-shadow:0 0 3px 2px #aac9ff}gux-input-checkbox input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%2377828f' /%3E%3C/svg%3E\")}gux-input-checkbox.gux-input-error input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%23ea0b0b' /%3E%3C/svg%3E\")}gux-input-checkbox input:not(:checked):not(:disabled):not(:indeterminate)~label:hover::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 2.467a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7m0-1h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:checked~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M11.138 1.467h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM6.8 11 3.638 7.941l.89-.932L6.8 9.2l3.947-3.861.891.932z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:indeterminate~label::after{background-image:url(\"data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4.138 8.467h7v-1h-7zm7-7h-7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zm2 10a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2z' fill='%232a60c8' /%3E%3C/svg%3E\")}gux-input-checkbox input:disabled~label::after,gux-input-checkbox input:disabled~label{cursor:not-allowed;opacity:0.5}";

const GuxInputCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "gux-input-checkbox-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
};
GuxInputCheckbox.style = guxInputCheckboxCss;

const required = "Required";
const colorInputResources = {
	required: required
};

const guxInputColorCss = "gux-input-color{color:#2e394c}gux-input-color>section{position:relative;display:inline-block;width:160px}gux-input-color>gux-input-color-option{display:none}gux-input-color .gux-input-color-main-element{box-sizing:border-box;width:100%;padding:0;margin:0;cursor:pointer;user-select:none;background-color:#f6f7f9;border:1px solid #b4bccb;border-radius:4px;outline:none;box-shadow:0 0 0 0 transparent;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);transition:box-shadow 0.2s}gux-input-color .gux-input-color-main-element:focus-visible,gux-input-color .gux-input-color-main-element.gux-opened{border-color:#2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-color .gux-input-color-main-element:disabled{pointer-events:none;cursor:default;opacity:0.5}gux-input-color .gux-input-color-main-element:hover gux-icon,gux-input-color .gux-input-color-main-element:focus-visible gux-icon{color:#2e394c}gux-input-color .gux-input-color-selected-color{float:left;padding:8px;margin:8px 12px}gux-input-color .gux-input-color-color-name{float:left;margin:9px 0;font-size:12px}gux-input-color .gux-input-color-color-select{position:absolute;top:100%;left:0;z-index:var(--gux-zindex-popup, 1);display:none;width:100%}gux-input-color .gux-input-color-color-select.gux-opened{display:inherit}gux-input-color gux-icon{position:absolute;top:0;right:0;display:flex;align-items:center;width:16px;height:100%;padding:0 7px;overflow:hidden;color:#596373;pointer-events:none;cursor:pointer;background:none;border:none;outline:none}gux-input-color .gux-hidden{position:absolute;top:auto;left:-10000px;width:1px;height:1px;overflow:hidden}";

const GuxInputColor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.requiredId = randomHTMLId('gux-input-color-required');
    this.guxLabelDescribedby = undefined;
    this.guxErrorDescribedby = undefined;
    this.guxRequired = undefined;
    this.disabled = undefined;
    this.color = undefined;
    this.opened = undefined;
    this.colorOnOpen = undefined;
  }
  onClick(e) {
    const element = e.target;
    if (!this.root.contains(element)) {
      this.setOpened(false);
    }
  }
  onInput(e) {
    const input = e.target;
    this.color = input.value;
  }
  async componentWillLoad() {
    this.i18n = await buildI18nForComponent(this.root, colorInputResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.input.addEventListener('change', (e) => {
      if (this.opened) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
      }
    });
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.disabled = this.input.disabled;
    this.color = this.input.value;
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("section", null, h("span", { class: "gux-hidden", id: this.requiredId }, this.i18n('required')), h("button", { "aria-describedby": `${this.guxLabelDescribedby} ${this.guxRequired ? this.requiredId : ''} ${this.guxErrorDescribedby}`, "aria-expanded": this.opened ? 'true' : 'false', type: "button", class: {
        'gux-input-color-main-element': true,
        'gux-opened': this.opened
      }, disabled: this.disabled, onClick: this.clickHandler.bind(this) }, h("div", { class: "gux-input-color-selected-color", style: { background: this.color } }), h("div", { class: "gux-input-color-color-name" }, this.color), h("gux-icon", { decorative: true, "icon-name": "chevron-small-down" })), h("gux-color-select", { class: {
        'gux-input-color-color-select': true,
        'gux-opened': this.opened
      } }, h("slot", { name: "input", slot: "input" }))));
  }
  setOpened(opened) {
    if (this.colorOnOpen && this.colorOnOpen !== this.color) {
      this.colorOnOpen = this.color;
      this.input.dispatchEvent(new Event('change', {
        bubbles: true
      }));
    }
    this.colorOnOpen = this.color;
    this.opened = opened;
  }
  clickHandler() {
    if (!this.disabled) {
      this.setOpened(!this.opened);
    }
  }
  get root() { return getElement(this); }
};
GuxInputColor.style = guxInputColorCss;

const clear = "Clear";
const increment = "Increment";
const decrement = "Decrement";
const componentResources = {
	clear: clear,
	increment: increment,
	decrement: decrement
};

const guxInputNumberCss = "gux-input-number{position:relative;display:block}gux-input-number .gux-input-number-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center}gux-input-number .gux-input-number-container.gux-disabled{opacity:0.5}gux-input-number .gux-input-number-container .gux-input-container{box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;align-self:auto;justify-content:center;order:0;width:100%;height:32px;padding:4px 12px;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-number .gux-input-number-container .gux-input-container input{flex:1 1 auto;align-self:auto;order:0;color:#2e394c;text-align:right;background-color:#f6f7f9;border:none;outline:none;}gux-input-number .gux-input-number-container .gux-input-container input::placeholder{color:#596373;opacity:1}gux-input-number .gux-input-number-container .gux-input-container input::-webkit-outer-spin-button,gux-input-number .gux-input-number-container .gux-input-container input::-webkit-inner-spin-button{margin:0;-webkit-appearance:none}gux-input-number .gux-input-number-container .gux-input-container input[type='number']{-moz-appearance:textfield}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):focus-visible,gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-input-container .gux-clear-button gux-icon{width:12px;height:12px}gux-input-number .gux-input-number-container .gux-step-buttons-container{flex:0 1 16px;align-self:auto;order:0;margin:0 4px}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button{flex:0 1 auto;align-self:auto;order:0;padding:2px;color:#596373;background:transparent;border:none}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):focus-visible,gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button:not(:disabled):hover{color:#2a60c8;cursor:pointer}gux-input-number .gux-input-number-container .gux-step-buttons-container .gux-step-button gux-icon{width:10px;height:10px}gux-input-number .gux-input-number-container:focus-within .gux-input-container{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}";

const GuxInputNumber = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.clearable = undefined;
    this.hasContent = false;
    this.disabled = undefined;
  }
  clearInput() {
    setInputValue(this.input, '', true);
  }
  setHasContent() {
    this.hasContent = Boolean(this.input.value);
  }
  simulateNativeInputAndChangeEvents() {
    simulateNativeEvent(this.input, 'input');
    simulateNativeEvent(this.input, 'change');
  }
  stepUp() {
    if (this.input.value === '') {
      setInputValue(this.input, this.input.min || '0', false);
    }
    else {
      this.input.stepUp();
      this.simulateNativeInputAndChangeEvents();
    }
  }
  stepDown() {
    if (this.input.value === '') {
      setInputValue(this.input, this.input.min || '0', false);
    }
    else {
      this.input.stepDown();
      this.simulateNativeInputAndChangeEvents();
    }
  }
  renderClearButton() {
    if (this.clearable && this.hasContent && !this.disabled) {
      return (h("button", { class: "gux-clear-button", tabIndex: -1, type: "button", title: this.getI18nValue('clear'), disabled: this.disabled, onClick: this.clearInput.bind(this) }, h("gux-icon", { "icon-name": "close", decorative: true })));
    }
    return null;
  }
  renderStepButtons() {
    return (h("div", { class: "gux-step-buttons-container" }, h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: this.getI18nValue('increment'), disabled: this.disabled, onClick: () => this.stepUp() }, h("gux-icon", { "icon-name": "chevron-small-up", decorative: true })), h("button", { class: "gux-step-button", tabIndex: -1, type: "button", title: this.getI18nValue('decrement'), disabled: this.disabled, onClick: () => this.stepDown() }, h("gux-icon", { "icon-name": "chevron-small-down", decorative: true }))));
  }
  async componentWillLoad() {
    this.getI18nValue = await buildI18nForComponent(this.root, componentResources);
    this.input = this.root.querySelector('input[slot="input"]');
    this.setHasContent();
    this.disabled = this.input.disabled;
    this.input.addEventListener('input', () => {
      this.setHasContent();
    });
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-input-number-container': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: "gux-input-container" }, h("slot", { name: "input" }), this.renderClearButton()), this.renderStepButtons()));
  }
  get root() { return getElement(this); }
};
GuxInputNumber.style = guxInputNumberCss;

const guxInputRadioCss = "gux-input-radio{display:block;color:#2e394c}gux-input-radio .gux-input-radio-container{position:relative;padding-left:24px;line-height:24px}gux-input-radio input{position:absolute;z-index:-1;opacity:0}gux-input-radio label{display:inline-block;font-size:12px}gux-input-radio label::after{position:absolute;top:4px;left:4px;display:block;width:16px;height:16px;content:'';border-radius:50%}gux-input-radio input:focus-within~label::after{box-shadow:0 0 2px 1px #aac9ff, inset 0 0 2px 1px #aac9ff}gux-input-radio input:not(:checked)~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%2377828f'/%3E%3C/svg%3E\")}gux-input-radio input:not(:checked):not(:disabled)~label:hover::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.062C5.239 3.062 3 5.273 3 8s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill-rule='evenodd' clip-rule='evenodd' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:checked~label::after{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8.026 5.262a2.8 2.8 0 1 0 .001 5.601 2.8 2.8 0 0 0-.001-5.601zm0-2.2c-2.761 0-5 2.211-5 4.938s2.239 4.938 5 4.938c2.762 0 5-2.211 5-4.938s-2.238-4.938-5-4.938zm0 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' fill='%232a60c8'/%3E%3C/svg%3E\")}gux-input-radio input:disabled~label::after,gux-input-radio input:disabled~label{cursor:not-allowed;opacity:0.5}";

const GuxInputRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "gux-input-radio-container" }, h("slot", { name: "input" }), h("slot", { name: "label" })));
  }
};
GuxInputRadio.style = guxInputRadioCss;

var performanceNow = createCommonjsModule(function (module) {
// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(commonjsGlobal);

//# sourceMappingURL=performance-now.js.map
});

var root = typeof window === 'undefined' ? commonjsGlobal : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix];
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix];
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60;

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = performanceNow()
        , next = Math.max(0, frameDuration - (_now - last));
      last = next + _now;
      setTimeout(function() {
        var cp = queue.slice(0);
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0;
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last);
            } catch(e) {
              setTimeout(function() { throw e }, 0);
            }
          }
        }
      }, Math.round(next));
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });
    return id
  };

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true;
      }
    }
  };
}

var raf_1 = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
};
var cancel = function() {
  caf.apply(root, arguments);
};
var polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
};
raf_1.cancel = cancel;
raf_1.polyfill = polyfill;

var MODE;
(function (MODE) {
    MODE[MODE["MODE_TIMEOUT"] = 0] = "MODE_TIMEOUT";
    MODE[MODE["MODE_INTERVAL"] = 1] = "MODE_INTERVAL";
})(MODE || (MODE = {}));
const fnMap = new Map();
const executionSet = new Set();
let rafStarted = false;
let startId = 0;
function getTimeStamp() {
    return new Date().getTime();
}
function executeFn(value) {
    const { fn, args } = value;
    fn(...args);
}
function runFunction() {
    if (executionSet.size === 0)
        return;
    executionSet.forEach(executeFn);
    executionSet.clear();
}
const checkTick = (currentTimeTick) => (value, id) => {
    const { nextTick, ms, mode } = value;
    if (currentTimeTick - nextTick >= 0) {
        executionSet.add(value);
        if (mode === MODE.MODE_TIMEOUT) {
            fnMap.delete(id);
        }
        else {
            fnMap.set(id, {
                ...value,
                nextTick: nextTick + ms,
            });
        }
    }
};
function loop() {
    if (fnMap.size === 0) {
        rafStarted = false;
        return;
    }
    const currentTimeTick = getTimeStamp();
    fnMap.forEach(checkTick(currentTimeTick));
    runFunction();
    if (fnMap.size === 0) {
        rafStarted = false;
        return;
    }
    raf_1(loop);
}
function addId({ fn, ms, args, mode }) {
    if (!fn)
        return null;
    const currentId = startId;
    fnMap.set(currentId, {
        fn,
        ms,
        nextTick: getTimeStamp() + ms,
        args,
        mode,
    });
    if (!rafStarted) {
        rafStarted = true;
        raf_1(loop);
    }
    startId += 1;
    return currentId;
}
function removeId(id) {
    if (id == null)
        return;
    if (fnMap.has(id)) {
        fnMap.delete(id);
    }
}
const setInterval = (fn, ms = 0, ...args) => addId({ fn, ms, args, mode: MODE.MODE_INTERVAL });
const clearInterval = removeId;

const guxInputRangeCss = "gux-input-range .gux-container{display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:flex-start;height:32px;font-size:12px}gux-input-range .gux-container.gux-disabled{pointer-events:none;opacity:0.5}gux-input-range .gux-container .gux-range{position:relative;flex:1 1 auto;align-self:center;order:0}gux-input-range .gux-container .gux-range .gux-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad}gux-input-range .gux-container .gux-range .gux-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']{position:absolute;width:100%;height:2px;margin:6px 0;margin-top:calc(-1 * (12px / 2 + 2px));background:transparent;-webkit-appearance:none}gux-input-range .gux-container .gux-range input[type='range']:focus{outline:none}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-runnable-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-runnable-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-webkit-slider-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;margin-top:-5px;-webkit-appearance:none;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']:focus::-webkit-slider-runnable-track{background:rgba(13, 13, 13, 0)}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-moz-range-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;margin-top:-5px;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-ms-track{width:100%;height:2px;margin:6px 0;background-color:#8a97ad;color:transparent;background:transparent;border-color:transparent;border-width:12px 0}gux-input-range .gux-container .gux-range input[type='range']::-ms-track .gux-progress{height:2px;background-color:#2a60c8}gux-input-range .gux-container .gux-range input[type='range']::-ms-fill-lower{background:rgba(0, 0, 0, 0)}gux-input-range .gux-container .gux-range input[type='range']::-ms-fill-upper{background:transparent}gux-input-range .gux-container .gux-range input[type='range']::-ms-thumb{display:block;width:12px;height:12px;cursor:pointer;border-radius:100%;background:#2a60c8;border:0 solid #2a60c8}gux-input-range .gux-container .gux-range input[type='range']:focus::-ms-fill-lower{background:transparent}gux-input-range .gux-container .gux-range input[type='range']:focus::-ms-fill-upper{background:rgba(13, 13, 13, 0)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-webkit-slider-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-moz-range-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-range.gux-active input[type='range']::-ms-thumb{transform:scale(1.5)}gux-input-range .gux-container .gux-display{flex:0 1 auto;align-self:auto;order:0;height:32px;margin:0 0 0 16px;line-height:32px;text-align:right}gux-input-range .gux-container .gux-display.gux-hidden{display:none}gux-input-range .gux-range-tooltip-container{position:absolute;top:-50px;width:100%;height:32px;visibility:hidden}gux-input-range .gux-range-tooltip-container .gux-range-tooltip{font-family:Roboto, sans-serif;font-weight:400;font-size:11px;line-height:16px;position:absolute;z-index:1;display:flex;align-items:center;justify-content:center;width:50px;height:32px;margin-left:-20px;visibility:hidden;background-color:#fdfdfd;border:1px solid #b4bccb;border-radius:4px;box-shadow:0 2px 4px rgba(32, 41, 55, 0.24)}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::after,gux-input-range .gux-range-tooltip-container .gux-range-tooltip::before{position:absolute;top:100%;left:50%;width:0;height:0;pointer-events:none;content:' ';border:solid transparent}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::after{margin-left:-4px;border-width:4px;border-top-color:#fdfdfd}gux-input-range .gux-range-tooltip-container .gux-range-tooltip::before{margin-left:-6px;border-width:6px;border-top-color:#b4bccb}gux-input-range input[type='range']:hover~.gux-range-tooltip-container:not(.gux-hidden),gux-input-range input[type='range']:focus~.gux-range-tooltip-container:not(.gux-hidden),gux-input-range input[type='range']:active~.gux-range-tooltip-container:not(.gux-hidden){visibility:visible}gux-input-range input[type='range']:hover~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip,gux-input-range input[type='range']:focus~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip,gux-input-range input[type='range']:active~.gux-range-tooltip-container:not(.gux-hidden) .gux-range-tooltip{visibility:visible}";

const GuxInputRange = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.displayUnits = undefined;
    this.disabled = undefined;
    this.value = undefined;
    this.active = undefined;
    this.valueWatcherId = undefined;
    this.valueInTooltip = false;
  }
  onInput(e) {
    const input = e.target;
    this.updateValue(input.value);
  }
  onMousedown() {
    if (!this.disabled) {
      this.active = true;
    }
  }
  onMouseup() {
    this.active = false;
  }
  updateValue(newValue) {
    this.value = newValue;
    this.updatePosition();
  }
  updatePosition() {
    const value = Number(this.input.value || 0);
    const min = Number(this.input.min || 0);
    const max = Number(this.input.max || 100);
    const placementPercentage = ((value - min) / (max - min)) * 100;
    if (this.sliderTooltip) {
      const width = this.sliderTooltipContainer.offsetWidth;
      // Round tooltip position to the tenths place to prevent snapshot inconsistencies
      const offset = Math.round((placementPercentage / 100 - placementPercentage / 8 / width) * 1000) / 10;
      this.sliderTooltip.style.left = `${offset}%`;
    }
    this.progressElement.style.width = `${placementPercentage}%`;
  }
  getDisplayValue() {
    if (this.displayUnits) {
      return `${this.value}${this.displayUnits}`;
    }
    return this.value;
  }
  // Using componentWillLoad() instead of connectedCallback() here to fix
  // a bug caused by a race condition. Refer to COMUI-541 for details
  componentWillLoad() {
    this.input = this.root.querySelector('input[slot="input"]');
    this.disabled = this.input.disabled;
    this.value = this.input.value;
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
    this.valueWatcherId = setInterval(() => {
      if (this.value !== this.input.value) {
        this.updateValue(this.input.value);
      }
    }, 100);
  }
  componentDidLoad() {
    this.updatePosition();
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
    clearInterval(this.valueWatcherId);
  }
  render() {
    return (h("div", { class: {
        'gux-container': true,
        'gux-disabled': this.disabled
      } }, h("div", { class: {
        'gux-range': true,
        'gux-active': this.active
      } }, h("div", { class: "gux-track" }, h("div", { class: "gux-progress", ref: el => (this.progressElement = el) })), h("slot", { name: "input" }), h("div", { class: {
        'gux-range-tooltip-container': true,
        'gux-hidden': !this.valueInTooltip
      }, ref: el => (this.sliderTooltipContainer = el) }, h("div", { class: "gux-range-tooltip", ref: el => (this.sliderTooltip = el) }, this.getDisplayValue()))), h("div", { class: {
        'gux-display': true,
        'gux-hidden': this.valueInTooltip
      } }, this.getDisplayValue())));
  }
  get root() { return getElement(this); }
};
GuxInputRange.style = guxInputRangeCss;

const guxInputSelectCss = "gux-input-select{position:relative;display:block}gux-input-select .gux-input-container{position:relative;box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:nowrap;align-content:stretch;align-items:center;justify-content:center;width:100%;font-family:inherit;font-size:12px;line-height:1.6667;color:#2e394c;background-color:#f6f7f9;background-image:none;border:1px solid #6b7585;border-radius:4px;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16)}gux-input-select .gux-input-container.gux-disabled{pointer-events:none;opacity:0.5}gux-input-select .gux-input-container:hover gux-icon{color:#2a60c8}gux-input-select .gux-input-container select{flex:1 1 auto;align-self:auto;order:0;height:32px;padding:0 32px 0 12px;margin:0;color:#2e394c;background-color:#f6f7f9;border:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);-moz-appearance:none;-webkit-appearance:none;appearance:none}gux-input-select .gux-input-container gux-icon{position:absolute;top:0;right:0;width:16px;height:16px;margin:8px;pointer-events:none}gux-input-select .gux-input-container:focus-within{border:1px solid #2a60c8;outline:none;box-shadow:0 0 4px #75a8ff}";

const GuxInputSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = undefined;
  }
  componentWillLoad() {
    this.input = this.root.querySelector('select[slot="input"]');
    this.disabled = this.input.disabled;
    this.disabledObserver = onDisabledChange(this.input, (disabled) => {
      this.disabled = disabled;
    });
  }
  disconnectedCallback() {
    if (this.disabledObserver) {
      this.disabledObserver.disconnect();
    }
  }
  render() {
    return (h("div", { class: {
        'gux-input-container': true,
        'gux-disabled': this.disabled
      } }, h("slot", { name: "input" }), h("gux-icon", { decorative: true, iconName: "ic-dropdown-arrow" })));
  }
  get root() { return getElement(this); }
};
GuxInputSelect.style = guxInputSelectCss;

const guxInputTextareaCss = "gux-input-textarea{position:relative;display:block}gux-input-textarea .gux-resize-none textarea{resize:none}gux-input-textarea .gux-resize-auto{display:grid;overflow:hidden;word-break:normal;word-break:break-word;overflow-wrap:anywhere}gux-input-textarea .gux-resize-auto::after{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;white-space:pre-wrap;visibility:hidden;content:attr(data-replicated-value) ' ';min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea .gux-resize-auto textarea{grid-row-start:1;grid-row-end:2;grid-column-start:1;grid-column-end:2;overflow-x:hidden;resize:none}gux-input-textarea textarea{flex:1 1 auto;align-self:auto;order:0;font-family:inherit;font-family:Roboto, sans-serif;font-weight:400;font-size:12px;line-height:20px;color:#2e394c;background-color:#f6f7f9;background-image:none;border-radius:4px;outline:none;box-shadow:inset 0 0 4px rgba(32, 41, 55, 0.16);min-width:100%;max-width:100%;min-height:90px;padding:4px 12px;margin:0;border:1px solid #6b7585}gux-input-textarea textarea::placeholder{color:#596373;opacity:1}gux-input-textarea textarea:focus-within{border-color:#2a60c8;box-shadow:0 0 4px rgba(117, 168, 255, 0.5)}gux-input-textarea textarea[disabled]{opacity:0.5}";

const GuxInputTextArea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resize = 'none';
  }
  componentWillLoad() {
    this.input = this.root.querySelector('textarea[slot="input"]');
    this.input.addEventListener('input', () => {
      this.updateHeight();
    });
  }
  componentDidLoad() {
    this.updateHeight();
  }
  updateHeight() {
    if (this.resize === 'auto') {
      this.containerElement.dataset.replicatedValue = this.input.value;
      this.containerElement.style.maxHeight = this.input.style.maxHeight;
    }
  }
  render() {
    return (h("div", { ref: el => (this.containerElement = el), class: `gux-resize-${this.resize}` }, h("slot", { name: "input" })));
  }
  get root() { return getElement(this); }
};
GuxInputTextArea.style = guxInputTextareaCss;

export { GuxInputCheckbox as gux_input_checkbox, GuxInputColor as gux_input_color, GuxInputNumber as gux_input_number, GuxInputRadio as gux_input_radio, GuxInputRange as gux_input_range, GuxInputSelect as gux_input_select, GuxInputTextArea as gux_input_textarea };
