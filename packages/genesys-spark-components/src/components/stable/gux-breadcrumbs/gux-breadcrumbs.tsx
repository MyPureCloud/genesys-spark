import { Component, Element, h, JSX, Prop, forceUpdate } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
import { trackComponent } from '@utils/tracking/usage';

import breadcrumbsResources from './i18n/en.json';
import { GuxBreadcrumbAccent } from './gux-breadcrumbs.types';

/**
 * @slot - collection of gux-breadcrumb-item elements
 */

@Component({
  styleUrl: 'gux-breadcrumbs.scss',
  tag: 'gux-breadcrumbs',
  shadow: true
})
export class GuxBreadcrumbs {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLElement;

  @Prop()
  accent: GuxBreadcrumbAccent = 'primary';

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.accent });
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, breadcrumbsResources);
  }

  private onSlotChange() {
    Array.from(this.root.children).forEach(child => forceUpdate(child));
  }

  render(): JSX.Element {
    return (
      <nav aria-label={this.i18n('breadcrumbs')}>
        <ol>
          <slot onSlotchange={this.onSlotChange.bind(this)} />
        </ol>
      </nav>
    ) as JSX.Element;
  }
}
