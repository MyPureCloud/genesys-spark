import { Component, Element, h, JSX, Listen, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - collection of gux-accordion-section elements
 */

@Component({
  styleUrl: 'gux-accordion.less',
  tag: 'gux-accordion',
  shadow: true
})
export class GuxAccordion {
  @Element()
  root: HTMLElement;

  @Prop()
  singleOpenSection: boolean = false;

  @Listen('guxopened')
  handleGuxopened(event: CustomEvent) {
    if (this.singleOpenSection) {
      this.getAccordionSections().forEach(section => {
        if (section !== event.target) {
          this.closeSection(section);
        }
      });
    }
  }

  componentWillLoad() {
    if (this.singleOpenSection) {
      this.getAccordionSections().reduceRight((openFound, section) => {
        if (openFound) {
          this.closeSection(section);
        }

        return openFound || section.open;
      }, false);
    }

    trackComponent(this.root);
  }

  private getAccordionSections(): HTMLGuxAccordionSectionElement[] {
    return Array.from(this.root.children) as HTMLGuxAccordionSectionElement[];
  }

  private closeSection(section: HTMLGuxAccordionSectionElement): void {
    if (!section.disabled) {
      section.open = false;
    }
  }

  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
