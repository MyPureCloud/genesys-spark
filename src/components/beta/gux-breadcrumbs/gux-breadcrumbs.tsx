import { Component, Element, h, Prop } from '@stencil/core';
import breadcrumbsResources from './i18n/en.json';
import { buildI18nForComponent } from '../../../i18n';

@Component({
  styleUrl: 'gux-breadcrumbs.less',
  tag: 'gux-breadcrumbs-beta'
})
export class GuxBreadcrumbs {
  @Element()
  root: HTMLElement;

  @Prop()
  accent: string = 'primary';

  private i18n: (resourceKey: string, context?: any) => string;

  async componentWillRender() {
    this.i18n = await buildI18nForComponent(this.root, breadcrumbsResources);

    const childrens = Array.from(this.root.children);
    const lastElement = childrens[childrens.length - 1] as HTMLElement;
    if (lastElement) lastElement.setAttribute('last-breadcrumb', '');
    for (const children of childrens) {
      children.setAttribute('accent', this.accent);
    }
  }

  render() {
    return (
      <nav
        aria-label={this.i18n('label')}
        class={`breadcrumbs ${
          this.accent === 'primary' ? 'gux-large-text' : ''
        }`}
      >
        <slot />
      </nav>
    );
  }
}
