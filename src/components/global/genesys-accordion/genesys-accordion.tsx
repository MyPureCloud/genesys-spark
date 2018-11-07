import { Component, Element, Method } from '@stencil/core';
import { KeyCode } from '../../../common-enums';

@Component({
  styleUrl: 'genesys-accordion.less',
  tag: 'genesys-accordion'
})
export class GenesysAccordion {
  @Element()
  root: HTMLStencilElement;

  sections: string[] = [];

  initializeSections () {
    const children = Array.from(this.root.children);
    children.map((element) => {
      const slotName = element.getAttribute('slot');
      if (slotName) {
        this.sections.push(slotName);
      } else {
        element.parentNode.removeChild(element);
      }
    });
  }

  componentWillLoad () {
    this.initializeSections();
  }

  /**
   * Opens a section.
   * @param slot The slot name
   */
  @Method()
  open (slot: string) {
    this.root.querySelector(`li.section.${slot.replace(/\s+/g, '')}`).classList.add('opened');
  }
  /**
   * Closes a section.
   * @param slot The slot name
   */
  @Method()
  close (slot: string) {
    this.root.querySelector(`li.section.${slot.replace(/\s+/g, '')}`).classList.remove('opened');
  }
  /**
   * Toggles a section.
   * @param slot The slot name
   */
  @Method()
  toggle (slot: string) {
    this.root.querySelector(`li.section.${slot.replace(/\s+/g, '')}`).classList.toggle('opened');
  }

  getPreviousSlot (slot) {
    const previousSlotIndex = this.sections.indexOf(slot) - 1;
    if ((previousSlotIndex) < 0) {
      return this.sections[this.sections.length - 1];
    } else {
      return this.sections[previousSlotIndex];
    }
  }

  getNextSlot (slot) {
    const nextSlotIndex = this.sections.indexOf(slot) + 1;
    if ((nextSlotIndex) >= this.sections.length) {
      return this.sections[0];
    } else {
      return this.sections[nextSlotIndex];
    }
  }

  onKeyDown (event: KeyboardEvent, slot: string) {
    let element = null;
    switch (event.keyCode) {
      case KeyCode.Enter:
      case KeyCode.Space:
        this.toggle(slot);
        break;
      case KeyCode.Up:
        const previousSlot = this.getPreviousSlot(slot);
        element = this.root.querySelector(`li.section.${previousSlot.replace(/\s+/g, '')}`) as HTMLElement;
        element.focus();
        break;
      case KeyCode.Down:
        const nextSlot = this.getNextSlot(slot);
        element = this.root.querySelector(`li.section.${nextSlot.replace(/\s+/g, '')}`) as HTMLElement;
        element.focus();
        break;
      case KeyCode.End:
        element = this.root.querySelector(`li.section.${this.sections[this.sections.length - 1].replace(/\s+/g, '')}`) as HTMLElement;
        element.focus();
        break;
      case KeyCode.Home:
        element = this.root.querySelector(`li.section.${this.sections[0].replace(/\s+/g, '')}`) as HTMLElement;
        element.focus();
        break;
    }
  }

  render() {
    return (
      <ul class='genesys-accordion'>
      {this.sections.map((slot) =>
        <li
          class={'section ' + slot.replace(/\s+/g, '')}
          tabindex="0"
          onKeyDown={(e) => this.onKeyDown(e, slot)}>
          <div class="header" onClick={() => this.toggle(slot)}>
            <span>{slot}</span>
            <button aria-hidden="true" type="button" class="genesys-icon-dropdown-arrow" tabindex="-1"></button>
          </div>
          <div class="content"><slot name={slot}/></div>
        </li>
      )}
      </ul>
    );
  }
}
