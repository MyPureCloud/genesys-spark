import {
  Component,
  Event,
  EventEmitter,
  Prop,
  State
} from '@stencil/core';

let nextCheckboxId = 1;
const classForCheckedState = (state: boolean | undefined) => {
  if (state === undefined) {
    return 'gux-mixed';
  }

  return state ? 'gux-checked' : 'gux-unchecked';
};

@Component({
  styleUrl: 'gux-checkbox.less',
  tag: 'gux-checkbox'
})
export class GuxCheckbox {
  /**
   * Whether or not the checkbox is checked.  A value of undefined will display
   * and indeterminate or 'mixed' check style.
   */
  @Prop({
    mutable: true
  })
  checked: boolean | undefined;

  @Prop()
  label: string;

  @State()
  id: number;

  @Event()
  checkedChanged: EventEmitter<boolean>;

  componentWillLoad() {
    this.id = nextCheckboxId++;
  }

  setChecked(checked: boolean) {
    this.checked = checked;
    this.checkedChanged.emit(checked);
  }

  get checkedAttribute() {
    return this.checked ? { checked: true } : {};
  }

  render() {
    return (
      <div class="gux-checkbox-container">
        <input
          id={`gux-checkbox-${this.id}`}
          type="checkbox"
          onChange={e =>
            this.setChecked((e.target as HTMLInputElement).checked)
          }
          {...this.checkedAttribute}
        />
        <label
          htmlFor={`gux-checkbox-${this.id}`}
          class={classForCheckedState(this.checked)}
        >
          {this.label}
        </label>
      </div>
    );
  }
}
