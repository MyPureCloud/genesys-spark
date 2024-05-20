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

import { randomHTMLId } from '@utils/dom/random-html-id';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-create-option.scss',
  tag: 'gux-create-option',
  shadow: true
})
export class GuxCreateOption {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  value: string;

  @Prop()
  active: boolean = false;

  @Prop()
  hidden: boolean = true;

  @Prop()
  filtered: boolean = true;

  @State()
  hovered: boolean = false;

  @Listen('mouseenter')
  onmouseenter() {
    this.hovered = true;
  }

  @Listen('mouseleave')
  onMouseleave() {
    this.hovered = false;
  }

  @Event()
  internalcreatenewoption: EventEmitter<string>;

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxEmitInternalCreateNewOption(): Promise<void> {
    this.internalcreatenewoption.emit();
  }

  @Listen('click')
  handleClick() {
    this.internalcreatenewoption.emit(this.value);
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);
    this.root.id = this.root.id || randomHTMLId('gux-option-multi');
  }

  renderCustomOptionInstructions(): JSX.Element {
    return (
      <span class="gux-screenreader">
        {this.i18n('createCustomOptionInstructions')}
      </span>
    ) as JSX.Element;
  }

  render(): JSX.Element {
    return (
      <Host
        role="option"
        aria-selected={false}
        class={{
          'gux-active': this.active,
          'gux-hovered': this.hovered,
          'gux-filtered': this.filtered
        }}
      >
        <div class="gux-option">
          <gux-icon decorative icon-name="fa/plus-regular"></gux-icon>
          <div class="gux-create-text">
            {this.i18n('createOption', {
              optionValue: this.value
            })}
          </div>
          {this.renderCustomOptionInstructions()}
        </div>
      </Host>
    ) as JSX.Element;
  }
}
