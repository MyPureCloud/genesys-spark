import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop,
  Watch
} from '@stencil/core';

import { randomHTMLId } from '../../../../utils/dom/random-html-id';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-option-multi.less',
  tag: 'gux-option-multi'
})
export class GuxOptionMulti {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  active: boolean = false;

  @Prop({ mutable: true })
  selected: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  filtered: boolean = false;

  @Prop({ mutable: true })
  hovered: boolean = false;

  @Prop()
  custom: boolean = false;

  @Listen('mouseenter')
  onmouseenter() {
    this.hovered = true;
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hovered = false;
  }

  @Event()
  guxremovecustomoption: EventEmitter<string>;

  @Event()
  internalselectcustomoption: EventEmitter<string>;

  @Watch('selected')
  emitRemoveCustomOption() {
    if (!this.selected && this.custom) {
      this.guxremovecustomoption.emit();
    }
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
    if (this.custom) {
      this.internalselectcustomoption.emit(this.value);
    }
  }

  renderCustomOptionInstructions(): JSX.Element {
    if (this.custom) {
      return (
        <span class="gux-screenreader">
          {this.i18n('removeCustomElementInstructions')}
        </span>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host
        role="option"
        class={{
          'gux-active': this.active,
          'gux-disabled': this.disabled,
          'gux-filtered': this.filtered,
          'gux-hovered': this.hovered,
          'gux-selected': this.selected
        }}
        aria-selected={this.selected.toString()}
        aria-disabled={this.disabled.toString()}
      >
        <div class="gux-option">
          <slot />
        </div>
        {this.renderCustomOptionInstructions()}
      </Host>
    ) as JSX.Element;
  }
}
