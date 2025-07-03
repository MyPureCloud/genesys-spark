import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { GuxBadgeAccent } from './gux-badge.types';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';
import { OnMutation } from '@utils/decorator/on-mutation';

/**
 * @slot - Required slot for label
 */

@Component({
  styleUrl: 'gux-badge.scss',
  tag: 'gux-badge',
  shadow: true
})
export class GuxBadge {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  accent: GuxBadgeAccent = 'info';

  @Prop()
  bold: boolean = false;

  @State()
  label: string;

  @OnMutation({ childList: true, subtree: true, characterData: true })
  onMutation(): void {
    this.label = this.root.textContent || '';
  }

  private onSlotChange(event: Event) {
    const slotAssignedNodes = (
      event.composedPath()[0] as HTMLSlotElement
    ).assignedNodes();
    this.label = slotAssignedNodes
      .map(nodeItem => nodeItem.textContent)
      .join('');
  }

  private renderBadgeTitle(): JSX.Element {
    return (
      /*
        NVDA will announce items as 'clickable' if event handlers are detected.
        In this case, the hover event handler is used on the tooltip-title.
        Since this is not useful for screen reader users, we hide the tooltip-title.
      */
      <gux-tooltip-title aria-hidden="true">
        <span>
          <slot
            aria-hidden="true"
            onSlotchange={this.onSlotChange.bind(this)}
          />
        </span>
      </gux-tooltip-title>
    ) as JSX.Element;
  }

  private renderSrText(): JSX.Element {
    return (
      <div class="gux-sr-only">
        {this.i18n(this.getVariant(), {
          label: this.label
        })}
      </div>
    ) as JSX.Element;
  }

  private getVariant(): string {
    return `${this.accent}${this.bold ? '-bold' : ''}`;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-badge': true,
          [`gux-${this.accent}`]: true,
          'gux-bold': this.bold
        }}
      >
        {this.renderBadgeTitle()}
        {this.renderSrText()}
      </div>
    ) as JSX.Element;
  }
}
