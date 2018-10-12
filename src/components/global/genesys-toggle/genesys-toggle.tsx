import { Event, EventEmitter, Component, Prop, Listen, Element } from '@stencil/core';

@Component({
  tag: 'genesys-toggle',
  styleUrl: 'genesys-toggle.scss'
})

export class GenesysToggle {

  @Element() root: HTMLStencilElement
  checkboxElement: HTMLInputElement

  /**
  * Indicate if the toggle is checked or not
  **/
  @Prop({mutable: true, reflectToAttr: true}) checked: boolean

  /**
  * Indicate if the toggle is disabled or not
  **/
  @Prop({mutable: true, reflectToAttr: true}) disabled: boolean

  /**
  * Indicate the checked label
  **/
  @Prop({mutable: true, reflectToAttr: true}) checkedLabel: string

  /**
  * Indicate the unchecked label
  **/
  @Prop({mutable: true, reflectToAttr: true}) uncheckedLabel: string


  /**
   * Triggered when the state of the component changed.
   * @return the checked boolean value
   */
  @Event() check: EventEmitter
  emitInput (event) {
    event.preventDefault()
    event.stopPropagation()
    this.checked = event.target.checked
    this.check.emit(this.checked)
  }

  @Listen('keydown.enter')
  handleEnter() {
    if (!this.disabled) {
      this.checkboxElement.click()
    }
  }

  @Listen('keydown.space')
  handleSpace() {
    if (!this.disabled) {
      this.checkboxElement.click()
    }
  }

  componentDidLoad () {
    this.checkboxElement = this.root.querySelector('input')
  }

  toggle () {
    if (!this.disabled) {
      this.checkboxElement.click()
    }
  }

  render() {
    return (
      <div class={this.checked ? 'genesys-checked' : ''}>
        <label class="genesys-switch" tabindex='0'>
          <input type="checkbox" checked={this.checked} onInput={(e) => this.emitInput(e)} disabled={this.disabled} />
          <span class="genesys-slider genesys-round"></span>
        </label>
        { 
          this.uncheckedLabel && this.checkedLabel ?
          <span onClick={() => this.toggle()}>{this.checked ? this.checkedLabel : this.uncheckedLabel}</span>
          : ''
        }
      </div>
    );
  }
}