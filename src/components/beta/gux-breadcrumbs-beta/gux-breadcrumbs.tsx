import { Component, Element, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-breadcrumbs.less',
  tag: 'gux-breadcrumbs-beta'
})
export class GuxBreadcrumbs {
  @Element()
  root: HTMLElement;

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

  render() {
    return (
      <nav aria-label="Breadcrumbs" class="breadcrumbs">
        <slot />
      </nav>
    );
  }
}
