import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import {
  actOnActiveOption,
  clearActiveOptions,
  goToOption,
  hasPreviousOption,
  hasNextOption,
  onClickedOption,
  setFirstOptionActive,
  setInitialActiveOption,
  setLastOptionActive,
  setNextOptionActive,
  setPreviousOptionActive
} from '../gux-listbox/gux-listbox.service';

import { buildI18nForComponent, GetI18nValue } from 'i18n';
import { whenEventIsFrom } from 'utils/dom/when-event-is-from';
import simulateNativeEvent from 'utils/dom/simulate-native-event';
import { trackComponent } from 'usage-tracking';

import translationResources from './i18n/en.json';

/**
 * @slot - collection of gux-option-multi elements
 */
@Component({
  styleUrl: 'gux-listbox-multi.less',
  tag: 'gux-listbox-multi',
  shadow: true
})
export class GuxListboxMulti {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLGuxListboxElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  filter: string = '';

  @State()
  selectedValues: string[] = [];

  @State()
  listboxOptions: HTMLGuxOptionElement[] = [];

  @State()
  allListboxOptionsFiltered: boolean;

  @Event()
  internallistboxoptionsupdated: EventEmitter;

  @Listen('focus')
  onFocus(): void {
    setInitialActiveOption(this.root);
  }

  @Listen('blur')
  onBlur(): void {
    clearActiveOptions(this.root);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        actOnActiveOption(this.root, value => this.updateValue(value));
        return;

      case 'ArrowDown':
        event.preventDefault();
        if (hasNextOption(this.root)) {
          event.stopPropagation();
          setNextOptionActive(this.root);
        } else {
          setFirstOptionActive(this.root);
        }
        return;

      case 'ArrowUp': {
        event.preventDefault();
        if (hasPreviousOption(this.root)) {
          event.stopPropagation();
          setPreviousOptionActive(this.root);
        } else {
          setLastOptionActive(this.root);
        }
        return;
      }

      case 'Home': {
        event.preventDefault();
        setFirstOptionActive(this.root);
        return;
      }

      case 'End': {
        event.preventDefault();
        setLastOptionActive(this.root);
        return;
      }

      case ' ': {
        event.preventDefault();
        return;
      }
    }

    if (event.key.length === 1) {
      goToOption(this.root, event.key);
      return;
    }
  }

  @Listen('keyup')
  onKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
        actOnActiveOption(this.root, value => this.updateValue(value));
        return;
    }
  }

  @Listen('mousemove', {})
  onMousemove(): void {
    clearActiveOptions(this.root);
  }

  @Listen('click')
  onClick(event: MouseEvent): void {
    whenEventIsFrom(
      'gux-option-multi',
      event,
      (option: HTMLGuxOptionMultiElement) => {
        onClickedOption(option, value => this.updateValue(value));
      }
    );
  }

  @Watch('value')
  validateValue() {
    if (this.value) {
      this.selectedValues = this.value.split(',');
    } else {
      this.selectedValues = [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSelectActive(): Promise<void> {
    actOnActiveOption(this.root, value => this.updateValue(value));
  }

  private setListboxOptions(): void {
    if (this.value) {
      this.selectedValues = this.value.split(',');
    }
    this.listboxOptions = Array.from(
      this.root.children
    ) as HTMLGuxOptionElement[];
    this.internallistboxoptionsupdated.emit();
  }

  private updateValue(newValue: string): void {
    if (!this.selectedValues.includes(newValue)) {
      const newArray = [...this.selectedValues, newValue];
      this.selectedValues = newArray;
      this.value = this.selectedValues.join(',');
    } else {
      this.selectedValues = this.selectedValues.filter(e => e !== newValue);
      this.value = this.selectedValues.join(',');
    }
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    this.setListboxOptions();
  }

  componentWillRender(): void {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = this.selectedValues.includes(
        listboxOption.value
      );
      listboxOption.filtered = !listboxOption.textContent
        .toLowerCase()
        .startsWith(this.filter.toLowerCase());
    });

    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
  }

  renderAllListboxOptionsFiltered(): JSX.Element {
    if (this.allListboxOptionsFiltered) {
      return (
        <div class="gux-no-matches">{this.i18n('noMatches')}</div>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host role="listbox" aria-multiselectable="true" tabindex={0}>
        <slot onSlotchange={() => this.setListboxOptions()} />
        {this.renderAllListboxOptionsFiltered()}
      </Host>
    ) as JSX.Element;
  }
}
