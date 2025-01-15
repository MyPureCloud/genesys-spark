import {
  Component,
  Element,
  Event,
  EventEmitter,
  JSX,
  Prop,
  h
} from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from 'i18n';
import { ILocalizedComponentResources } from 'i18n/fetchResources';

import { trackComponent } from '@utils/tracking/usage';
import componentResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-file-list-item.scss',
  tag: 'gux-file-list-item',
  shadow: true
})
export class GuxFileListItem {
  private getI18nValue: GetI18nValue;

  @Element()
  root: HTMLGuxFileListItemElement;

  @Prop()
  name!: string;

  @Prop()
  index!: number;

  @Prop()
  disabled: boolean = false;

  @Prop()
  status: 'default' | 'loading' | 'success' | 'error';

  @Event()
  guxremovefile: EventEmitter<number>;

  async componentWillLoad(): Promise<void> {
    this.getI18nValue = await buildI18nForComponent(
      this.root,
      componentResources as ILocalizedComponentResources
    );

    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-file-list-item': true,
          [`gux-${this.status}`]: true,
          'gux-disabled': this.disabled
        }}
      >
        <div class="gux-info">
          <gux-truncate>
            <span class="gux-file-name">{this.name}</span>
          </gux-truncate>

          {this.renderStatusIndicator()}
          {this.renderFileRemoveButton()}
        </div>

        {this.renderAdditionalInfo()}
      </div>
    ) as JSX.Element;
  }

  private renderStatusIndicator(): JSX.Element {
    switch (this.status) {
      case 'loading':
        return (
          <gux-radial-loading
            context="input"
            screenreader-text={this.getI18nValue('uploadingFile', {
              filename: this.name
            })}
          ></gux-radial-loading>
        ) as JSX.Element;
      case 'success':
        return (
          <gux-icon-tooltip-beta
            icon-name="fa/circle-check-solid"
            class="gux-indicator"
          >
            <span slot="content">
              {this.getI18nValue('success', { filename: this.name })}
            </span>
          </gux-icon-tooltip-beta>
        ) as JSX.Element;
      case 'error':
        return (
          <gux-icon-tooltip-beta
            icon-name="fa/hexagon-exclamation-solid"
            class="gux-indicator"
          >
            <span slot="content">
              {this.getI18nValue('error', { filename: this.name })}
            </span>
          </gux-icon-tooltip-beta>
        ) as JSX.Element;
      default:
        return null;
    }
  }

  private renderFileRemoveButton(): JSX.Element {
    if (this.disabled) {
      return null;
    }

    return (
      <gux-button-slot accent="ghost" icon-only>
        <button
          type="button"
          onClick={() => this.guxremovefile.emit(this.index)}
        >
          <gux-icon
            icon-name="fa/xmark-large-regular"
            size="small"
            decorative
          ></gux-icon>
          <gux-screen-reader-beta>
            {this.getI18nValue('removeFile', { filename: this.name })}
          </gux-screen-reader-beta>
        </button>
      </gux-button-slot>
    ) as JSX.Element;
  }

  private renderAdditionalInfo(): JSX.Element {
    if (this.status === 'error') {
      return (
        <div class="gux-additional-info">
          <div class="gux-additional-info-header">
            <slot name="additional-info-header" />
          </div>
          <div class="gux-additional-info-content">
            <slot name="additional-info-content" />
          </div>
        </div>
      ) as JSX.Element;
    }

    return null;
  }
}
