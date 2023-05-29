import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { GuxBadgeAccent, GuxBadgeColor } from './gux-badge.types';

import { trackComponent } from '@utils/tracking/usage';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import translationResources from './i18n/en.json';

/**
 * @slot - Required slot for label
 */

@Component({
  styleUrl: 'gux-badge.less',
  tag: 'gux-badge-beta',
  shadow: true
})
export class GuxBadge {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  color: GuxBadgeColor = 'neutral';

  @Prop()
  accent: GuxBadgeAccent = 'info';

  @Prop()
  bold: boolean = false;

  @State()
  label: string;

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
      <gux-tooltip-title>
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
    return `${this.color}${this.bold ? '-bold' : ''}`;
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
          [`gux-${this.color}`]: true,
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
