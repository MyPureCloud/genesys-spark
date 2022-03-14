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
  State
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
} from './gux-listbox.service';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { whenEventIsFrom } from '../../../utils/dom/when-event-is-from';
import simulateNativeEvent from '../../../utils/dom/simulate-native-event';
import { trackComponent } from '../../../usage-tracking';
import { logError } from '../../../utils/error/log-error';

import translationResources from './i18n/en.json';

/**
 * @slot - collection of gux-option-v2s
 */
@Component({
  styleUrl: 'gux-listbox.less',
  tag: 'gux-listbox',
  shadow: true
})
export class GuxListbox {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLGuxListboxElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  filter: string = '';

  @State()
  listboxOptions: HTMLGuxOptionV2Element[] = [];

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
      'gux-option-v2',
      event,
      (option: HTMLGuxOptionV2Element) => {
        onClickedOption(option, value => this.updateValue(value));
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxSelectActive(): Promise<void> {
    actOnActiveOption(this.root, value => this.updateValue(value));
  }

  private setListboxOptions(): void {
    this.listboxOptions = Array.from(
      this.root.children
    ) as HTMLGuxOptionV2Element[];
    this.internallistboxoptionsupdated.emit();
  }

  private updateValue(newValue: string): void {
    if (this.value !== newValue) {
      this.value = newValue;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    this.setListboxOptions();
  }

  componentDidLoad(): void {
    if (
      !(
        this.root.getAttribute('aria-label') ||
        this.root.getAttribute('aria-labelledby')
      )
    ) {
      logError(
        'gux-listbox',
        '`gux-listbox` requires a label. Either provide a label and associate it with the listbox using `aria-labelledby` or add an `aria-label` attribute to the gux-listbox element.'
      );
    }
  }

  componentWillRender(): void {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = listboxOption.value === this.value;
      listboxOption.filtered = !listboxOption.textContent
        .toLowerCase()
        .startsWith(this.filter.toLowerCase());
    });

    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;

    if (this.filter) {
      setFirstOptionActive(this.root);
    }
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
      <Host role="listbox" tabindex={0}>
        <slot onSlotchange={() => this.setListboxOptions()} />
        {this.renderAllListboxOptionsFiltered()}
      </Host>
    ) as JSX.Element;
  }
}
