import { Component, Element, h, Method } from '@stencil/core';
import { KeyCode } from '../../../common-enums';

interface ISection {
  slotName: string;
  slotRef: HTMLElement;
}

@Component({
  styleUrl: 'gux-accordion.less',
  tag: 'gux-accordion'
})
export class GuxAccordion {
  @Element()
  root: HTMLGuxAccordionElement;

  sections: ISection[] = [];

  initializeSections() {
    const children = Array.from(this.root.children);
    children.map(element => {
      const slot = element.getAttribute('slot');
      if (slot) {
        this.sections.push({
          slotName: slot,
          slotRef: null
        });
      } else {
        element.parentNode.removeChild(element);
      }
    });
  }

  componentWillLoad() {
    this.initializeSections();
  }

  /**
   * Opens a section.
   * @param slot The slot name
   */
  @Method()
  async open(slot: string) {
    const section = this.getSectionByName(slot);
    if (section) {
      section.slotRef.classList.add('opened');
    }
  }
  /**
   * Closes a section.
   * @param slot The slot name
   */
  @Method()
  async close(slot: string) {
    const section = this.getSectionByName(slot);
    if (section) {
      section.slotRef.classList.remove('opened');
    }
  }
  /**
   * Toggles a section.
   * @param slot The slot name
   */
  @Method()
  async toggle(slot: string) {
    const section = this.getSectionByName(slot);
    if (section) {
      section.slotRef.classList.toggle('opened');
    }
  }

  getSectionByName(slot: string): ISection {
    const slotIndex = this.sections
      .map(section => {
        return section.slotName;
      })
      .indexOf(slot);
    return this.sections[slotIndex];
  }

  getPreviousSlot(slot: string): HTMLElement {
    const currentIndex = this.sections
      .map(section => {
        return section.slotName;
      })
      .indexOf(slot);
    if (currentIndex <= 0) {
      return this.sections[this.sections.length - 1].slotRef;
    } else {
      return this.sections[currentIndex - 1].slotRef;
    }
  }

  getNextSlot(slot: string): HTMLElement {
    const currentIndex = this.sections
      .map(section => {
        return section.slotName;
      })
      .indexOf(slot);
    if (currentIndex >= this.sections.length - 1) {
      return this.sections[0].slotRef;
    } else {
      return this.sections[currentIndex + 1].slotRef;
    }
  }

  onKeyDown(event: KeyboardEvent, slotName: string) {
    switch (event.keyCode) {
      case KeyCode.Enter:
      case KeyCode.Space:
        this.toggle(slotName);
        break;
      case KeyCode.Up:
        const previousSlot = this.getPreviousSlot(slotName);
        previousSlot.focus();
        break;
      case KeyCode.Down:
        const nextSlot = this.getNextSlot(slotName);
        nextSlot.focus();
        break;
      case KeyCode.End:
        const lastSlot = this.sections[this.sections.length - 1].slotRef;
        lastSlot.focus();
        break;
      case KeyCode.Home:
        const firstSlot = this.sections[0].slotRef;
        firstSlot.focus();
        break;
    }
  }

  render() {
    return (
      <ul class="gux-accordion">
        {this.sections.map(slot => (
          <li
            class="section"
            ref={el => (slot.slotRef = el)}
            tabindex="0"
            onKeyDown={e => this.onKeyDown(e, slot.slotName)}
          >
            <div class="header" onClick={() => this.toggle(slot.slotName)}>
              <span>{slot.slotName}</span>
              <button
                aria-hidden="true"
                type="button"
                class="genesys-icon-dropdown-arrow"
                tabindex="-1"
              />
            </div>
            <div class="content">
              <slot name={slot.slotName} />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
