import { Component, Element, Method } from '@stencil/core';

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
    this.root.querySelector(`li.section.${slot}`).classList.add('opened');
  }
  /**
   * Closes a section.
   * @param slot The slot name
   */
  @Method()
  close (slot: string) {
    this.root.querySelector(`li.section.${slot}`).classList.remove('opened');
  }
  /**
   * Toggles a section.
   * @param slot The slot name
   */
  @Method()
  toggle (slot: string) {
    this.root.querySelector(`li.section.${slot}`).classList.toggle('opened');
  }

  render() {
    return (
      <ul class='genesys-accordion'>
      {this.sections.map((slot) =>
        <li class={'section ' + slot}>
          <div class="header" onClick={() => this.toggle(slot)}>
            <span>{slot}</span>
            <button type="button" class="genesys-icon-dropdown-arrow"></button>
          </div>
          <div class="content"><slot name={slot}/></div>
        </li>
      )}
      </ul>
    );
  }
}
