import { Component, Element, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-breadcrumbs.less',
  tag: 'gux-breadcrumbs'
})
export class GuxBreadcrumbs {
  @Element()
  root: HTMLGuxBreadcrumbsElement;

  @Prop()
  accent: string = 'primary';

  componentWillRender() {
    const childrens = Array.from(this.root.children);
    const lastElement = childrens[childrens.length - 1] as HTMLElement;
    if (lastElement) lastElement.setAttribute('last-breadcrumb', '');
    for (const children of childrens) {
      children.setAttribute('accent', this.accent);
    }
  }
}
