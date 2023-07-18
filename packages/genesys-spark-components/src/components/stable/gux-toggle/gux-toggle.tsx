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

import { trackComponent } from '@utils/tracking/usage';
import { randomHTMLId } from '../../../utils/dom/random-html-id';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import translationResources from './i18n/en.json';

import { GuxToggleLabelPosition } from './gux-toggle.types';

@Component({
  styleUrl: 'gux-toggle.less',
  tag: 'gux-toggle',
  shadow: { delegatesFocus: true }
})
export class GuxToggle {
  private i18n: GetI18nValue;
  private announceElement: HTMLGuxAnnounceBetaElement;
  private labelId: string = randomHTMLId('gux-toggle-label');
  private errorId: string = randomHTMLId('gux-toggle-error');

  @Element()
  private root: HTMLElement;

  @Prop({ mutable: true })
  checked: boolean = false;

  @Prop()
  disabled: boolean = false;

  @Prop()
  loading: boolean = false;

  @Prop()
  checkedLabel: string;

  @Prop()
  uncheckedLabel: string;

  @Prop()
  labelPosition: GuxToggleLabelPosition = 'right';

  @Prop()
  errorMessage: string;

  @Prop()
  displayInline: boolean = false;

  @Watch('loading')
  handleLoading(loading: boolean) {
    if (loading) {
      void this.announceElement.guxAnnounce(this.i18n('toggleIsLoading'));
    } else {
      void this.announceElement.guxAnnounce(
        this.i18n('toggleIsFinishedLoading')
      );
    }
  }

  @Event()
  check: EventEmitter<boolean>;

  @Listen('click')
  onClick(): void {
    this.toggle();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
    }
  }

  private toggle(): void {
    if (!this.disabled && !this.loading) {
      const checkEvent = this.check.emit(!this.checked);
      if (!checkEvent.defaultPrevented) {
        this.checked = !this.checked;
      }
    }
  }

  private getAriaLabel(): string {
    return (
      this.root.getAttribute('aria-label') ||
      this.root.title ||
      this.i18n('defaultAriaLabel')
    );
  }

  async componentWillLoad(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, translationResources);

    const variant =
      this.checkedLabel || this.uncheckedLabel ? 'labled' : 'unlabled';

    trackComponent(this.root, { variant });
  }

  private renderLoading(): JSX.Element {
    if (this.loading) {
      return (
        <div class="gux-toggle-label-loading">
          <gux-radial-loading context="input"></gux-radial-loading>
        </div>
      ) as JSX.Element;
    }
  }

  private renderLabel(): JSX.Element {
    if (this.uncheckedLabel && this.checkedLabel) {
      const labelText = this.checked ? this.checkedLabel : this.uncheckedLabel;

      return (
        <div class="gux-toggle-label-and-error">
          <div class="gux-toggle-label">
            <div class="gux-toggle-label-text">
              <span class="gux-toggle-label-text-inner">
                <span id={this.labelId}>{labelText}</span>
                {this.renderLoading()}
              </span>
              <span class="gux-toggle-label-text-inner gux-hidden">
                {this.checkedLabel}
              </span>
              <span class="gux-toggle-label-text-inner gux-hidden">
                {this.uncheckedLabel}
              </span>
            </div>
          </div>
        </div>
      ) as JSX.Element;
    }
  }

  private renderError(): JSX.Element {
    if (this.errorMessage) {
      return (
        <div id={this.errorId} class="gux-toggle-error">
          <div class="gux-toggle-error-container">
            <gux-icon icon-name="alert-warning-octogon" decorative></gux-icon>
            <div class="gux-toggle-error-message">{this.errorMessage}</div>
          </div>
        </div>
      ) as JSX.Element;
    }
  }

  render(): JSX.Element {
    return (
      <Host class={{ 'gux-display-inline': this.displayInline }}>
        <div
          class={{
            'gux-toggle-container': true,
            'gux-toggle-label-left': this.labelPosition === 'left',
            'gux-disabled': this.disabled || this.loading
          }}
        >
          <div class="gux-toggle-input">
            <gux-toggle-slider
              checked={this.checked}
              disabled={this.disabled || this.loading}
              guxAriaLabel={this.getAriaLabel()}
              labelId={
                this.checkedLabel && this.uncheckedLabel ? this.labelId : ''
              }
              errorId={this.errorMessage ? this.errorId : ''}
            ></gux-toggle-slider>
            {this.renderLabel()}
          </div>
          {this.renderError()}
        </div>
        <gux-announce-beta
          ref={el => (this.announceElement = el)}
        ></gux-announce-beta>
      </Host>
    ) as JSX.Element;
  }
}
