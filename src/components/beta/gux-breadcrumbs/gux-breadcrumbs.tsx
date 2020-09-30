import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

import breadcrumbsResources from './i18n/en.json';

export type GuxBreadcrumbAccent = 'primary' | 'secondary';

@Component({
  styleUrl: 'gux-breadcrumbs.less',
  tag: 'gux-breadcrumbs-beta'
})
export class GuxBreadcrumbs {
  private i18n: GetI18nValue;

  @Element()
  private root: HTMLGuxBreadcrumbsBetaElement;

  @Prop()
  accent: GuxBreadcrumbAccent = 'primary';

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, breadcrumbsResources);
  }

  render(): JSX.Element {
    return (
      <nav
        aria-label={this.i18n('breadcrumbs')}
        class={{
          'gux-breadcrumbs-container': true,
          'gux-large-text': this.accent === 'primary'
        }}
      >
        <slot />
      </nav>
    );
  }
}
