import { Component, Element, Event, EventEmitter, Listen, Prop, Watch } from '@stencil/core'
import { IListItem } from '../../global/genesys-list/genesys-list-interfaces'

@Component({
  styleUrl: 'genesys-action-button.less',
  tag: 'genesys-action-button'
})
export class GenesysActionButton {

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
  @Prop() text: string
  @Prop() accent: string = 'secondary'
  @Prop({mutable: true}) isOpen: boolean = false

  @Element() root: HTMLStencilElement

  toggle() {
    this.isOpen = !this.isOpen
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
          onClick={() => this.toggle()} 
          leftIcon='dropdown-arrow' 
          class='genesys-dropdown' />
        <genesys-list 
          items={this.items} 
          onClick={() => this.toggle()}/>
      </div>
    );
  }
}