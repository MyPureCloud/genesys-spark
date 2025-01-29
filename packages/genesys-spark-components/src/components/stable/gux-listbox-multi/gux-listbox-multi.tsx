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
  setPreviousOptionActive,
  hasActiveOption
} from '../gux-listbox/gux-listbox.service';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { whenEventIsFrom } from '@utils/dom/when-event-is-from';
import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { trackComponent } from '@utils/tracking/usage';
import { afterNextRender } from '@utils/dom/after-next-render';

import translationResources from './i18n/en.json';
import { GuxFilterTypes } from '../gux-dropdown/gux-dropdown.types';

/**
 * @slot - collection of gux-option-multi elements
 */
@Component({
  styleUrl: 'gux-listbox-multi.scss',
  tag: 'gux-listbox-multi',
  shadow: true
})
export class GuxListboxMulti {
  private i18n: GetI18nValue;
  private optionCreateElement: HTMLGuxCreateOptionElement;

  @Element()
  root: HTMLGuxListboxElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  loading: boolean = false;

  @Prop()
  filter: string = '';

  @Prop()
  textInput: string = '';

  @Prop()
  filterType: GuxFilterTypes = 'none';

  @Prop()
  emptyMessage: string;

  /* This is used by child components to keep track of this component's disabled state */
  @Prop()
  disabled: boolean = false;

  @State()
  listboxOptions: HTMLGuxOptionMultiElement[] = [];

  @State()
  allListboxOptionsFiltered: boolean;

  @Event()
  internallistboxoptionsupdated: EventEmitter;

  @Prop({ mutable: true })
  hasExactMatch: boolean = false;

  @Listen('blur')
  onBlur(): void {
    clearActiveOptions(this.root);
  }

  @Listen('internalselectcustomoption')
  selectNewCustomOption(event: CustomEvent<string>): void {
    this.updateValue(event.detail);
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    if (!hasActiveOption(this.root)) {
      event.preventDefault();
      setInitialActiveOption(this.root);
      return;
    }

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (this.optionCreateElement?.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        } else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
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
        if (this.optionCreateElement?.active) {
          void this.optionCreateElement.guxEmitInternalCreateNewOption();
          afterNextRender(() => {
            setInitialActiveOption(this.root);
          });
        } else {
          actOnActiveOption(this.root, value => this.updateValue(value));
        }
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

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxSelectActive(): Promise<void> {
    actOnActiveOption(this.root, value => this.updateValue(value));
  }

  private getHasExactMatch(): boolean {
    let hasExactMatch = false;
    this.hasExactMatch = false;
    this.listboxOptions.forEach(listboxOption => {
      if (
        listboxOption.textContent?.toLowerCase()?.trim() ==
        this.textInput.toLowerCase().trim()
      ) {
        hasExactMatch = true;
        this.hasExactMatch = true;
      }
    });
    return hasExactMatch;
  }

  @Watch('textInput')
  updateOptionMultiCreateValue() {
    if (this.optionCreateElement) {
      this.optionCreateElement.value = this.textInput;
      this.optionCreateElement.filtered =
        !this.textInput || this.getHasExactMatch();
    }
  }

  // value as an array
  private getSelectedValues() {
    if (this.value) {
      return this.value.split(',');
    } else {
      return [];
    }
  }

  private updateOnSlotChange(): void {
    this.setListboxOptions();
    this.updateListboxOptions();
  }

  private getOptionCreateElement(): void {
    this.optionCreateElement = this.root.querySelector('gux-create-option');
  }

  // get list of listbox option elements
  private setListboxOptions(): void {
    this.listboxOptions = (
      Array.from(this.root.children) as HTMLGuxOptionMultiElement[]
    ).filter(element => element.tagName === 'GUX-OPTION-MULTI');

    this.internallistboxoptionsupdated.emit();
  }

  private updateListboxOptions(): void {
    this.listboxOptions.forEach(listboxOption => {
      listboxOption.selected = this.getSelectedValues().includes(
        listboxOption.value
      );
      if (this.filterType !== 'custom') {
        listboxOption.filtered = !listboxOption.shadowRoot
          .querySelector('slot')
          ?.assignedNodes()[0]
          ?.textContent.trim()
          .toLowerCase()
          .startsWith(this.textInput.toLowerCase());
      }
    });
  }

  private updateValue(newValue: string): void {
    if (!this.getSelectedValues().includes(newValue)) {
      const newArray = [...this.getSelectedValues(), newValue];
      this.value = newArray.join(',');
    } else {
      this.value = this.getSelectedValues()
        .filter(e => e !== newValue)
        .join(',');
    }
    simulateNativeEvent(this.root, 'input');
    simulateNativeEvent(this.root, 'change');
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.setListboxOptions();
    this.getOptionCreateElement();
  }

  componentWillRender(): void {
    this.setListboxOptions();

    this.updateListboxOptions();
    this.allListboxOptionsFiltered =
      this.listboxOptions.filter(listboxOption => !listboxOption.filtered)
        .length === 0;
  }

  // The slot must always be rendered so onSlotchange can be called
  renderHiddenSlot(): JSX.Element {
    return (
      <div hidden>
        <slot onSlotchange={() => this.setListboxOptions()} />
      </div>
    ) as JSX.Element;
  }

  renderLoading(): JSX.Element {
    return [
      <div class="gux-message-container">
        <gux-radial-loading context="modal"></gux-radial-loading>
        <span>{this.i18n('loading')}</span>
      </div>,
      this.renderHiddenSlot()
    ] as JSX.Element;
  }

  renderAllListboxOptionsFiltered(): JSX.Element {
    if (this.allListboxOptionsFiltered) {
      return [
        <div class="gux-message-container">
          <div class="gux-no-matches">
            {this.emptyMessage || this.i18n('noMatches')}
          </div>
        </div>,
        this.renderHiddenSlot()
      ] as JSX.Element;
    }
  }

  renderCreateOptionSlot(): JSX.Element {
    return (<slot name="create" />) as JSX.Element;
  }

  render(): JSX.Element {
    if (this.loading) {
      return this.renderLoading();
    }

    return (
      <Host role="listbox" aria-multiselectable="true" tabindex={0}>
        <slot onSlotchange={() => this.updateOnSlotChange()} />
        {this.renderAllListboxOptionsFiltered()}
        {this.renderCreateOptionSlot()}
      </Host>
    ) as JSX.Element;
  }
}
