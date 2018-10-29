import { Component, Element, Event, EventEmitter, Listen, Prop, Watch } from '@stencil/core'
import { KeyCode } from '../../../common-enums'
import { IListItem } from '../../../common-interfaces'

@Component({
  styleUrl: 'genesys-action-button.less',
  tag: 'genesys-action-button'
})
export class GenesysActionButton {
  listElement: HTMLElement
  dropdownButton: HTMLElement

  /**
   * Triggered when the menu is open
   */
  @Event() open: EventEmitter

  /**
   * Triggered when the menu is close
   */
  @Event() close: EventEmitter

  /**
   * Triggered when the action button is clicked
   */
  @Event() actionClick: EventEmitter

  /**
   * The list.
   * each item should contain a text and a type 
   * an item could have the poperty isDisabled
   */
  @Prop() items: IListItem[] = []

  /**
   * The component text.
   */
  @Prop() text: string

  /**
   * The component accent (secondary or primary).
   */
  @Prop() accent: string = 'secondary'

  /**
   * It is used to open or not the list.
   */
  @Prop({mutable: true}) isOpen: boolean = false

  @Element() root: HTMLStencilElement

  toggle() {
    this.isOpen = !this.isOpen
  }

  @Listen('focusout') 
  handleFocusOut(e: FocusEvent) {
    if (!this.root.contains(e.relatedTarget as Node)) {
      this.isOpen = false;
    }
  }

  @Listen('body:keydown')
  handleKeyDown(e) {
    if (this.root.contains(e.target)) {
      return
    }
    this.isOpen = false
  }

  @Listen('body:click')
  handleClick(e) {
    if (this.root.contains(e.target)) {
      return
    }
    this.isOpen = false
  }

  @Watch('isOpen')
  watchValue(newValue: boolean) {
    if (newValue) {
      this.open.emit()
    } else {
      this.close.emit()
    }
  }

  onKeyDownEvent (event: KeyboardEvent) {
    const key = event.keyCode;
    if (key === KeyCode.Esc) {
      this.isOpen = false;
      const e = this.dropdownButton.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]') as HTMLElement;
      e.focus();
    }
    if (key === KeyCode.Down && !this.listElement.contains(event.target as Node)) {
      this.isOpen = true;
      setTimeout(() => {
        const e = this.listElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]') as HTMLElement;
        e.focus();
      });
    }
  }

  render() {
    return (
      <div class={'genesys-action-button' + (this.isOpen ? ' open': '')}>
        <genesys-button 
          accent={this.accent} 
          text={this.text} 
          onClick={() => this.actionClick.emit()}
          class='genesys-action'/>
        <genesys-button 
          accent={this.accent} 
          ref={el => this.dropdownButton = el}
          onClick={() => this.toggle()}
          onKeyDown={(e) => this.onKeyDownEvent(e)}
          leftIcon='dropdown-arrow' 
          class='genesys-dropdown' />
        <genesys-list 
          ref={el => this.listElement = el}
          items={this.items} 
          onKeyDown={(e) => this.onKeyDownEvent(e)}
          onClick={() => this.toggle()}/>
      </div>
    );
  }
}