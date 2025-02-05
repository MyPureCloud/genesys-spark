import {
  Component,
  h,
  JSX,
  Element,
  Listen,
  Method,
  Host
} from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { groupKeyboardNavigation } from '../gux-avatar-group.service';
import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import defaultResources from './i18n/en.json';

@Component({
  styleUrl: 'gux-avatar-group-add-item.scss',
  tag: 'gux-avatar-group-add-item-beta',
  shadow: { delegatesFocus: true }
})
export class GuxAvatarGroupAddItem {
  private i18n: GetI18nValue;
  private tooltip: HTMLGuxTooltipBetaElement;

  @Element()
  root: HTMLElement;

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root);
    this.i18n = await buildI18nForComponent(this.root, defaultResources);
  }

  /*
   * Hide tooltip
   */
  @Method()
  async hideTooltip(): Promise<void> {
    return await this.tooltip.hideTooltip();
  }

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    groupKeyboardNavigation(event, this.root);
  }

  render(): JSX.Element {
    return (
      <Host role="menuitem">
        <button
          type="button"
          aria-label={this.i18n('addToGroup')}
          tabIndex={-1}
          class="gux-avatar"
        >
          <span aria-hidden="true">+</span>
          <gux-tooltip-beta
            aria-hidden="true"
            visual-only
            placement="top"
            ref={el => (this.tooltip = el)}
          >
            <div slot="content">{this.i18n('addToGroup')}</div>
          </gux-tooltip-beta>
        </button>
      </Host>
    ) as JSX.Element;
  }
}
