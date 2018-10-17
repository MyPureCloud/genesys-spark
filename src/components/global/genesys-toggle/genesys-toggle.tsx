import { Event, EventEmitter, Component, Prop, Element } from '@stencil/core';
const ENTER = 13;
const SPACE = 32;

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

  componentDidLoad () {
    this.checkboxElement = this.root.querySelector('input')
  }

  toggle () {
    if (!this.disabled) {
      this.checkboxElement.click()
    }
  }

  onKeyDown (event: KeyboardEvent) {
    if (event.keyCode === SPACE || event.keyCode === ENTER) {
      this.toggle();
    }
  }

  getAriaLabel () {
    let label = this.checked ? this.checkedLabel : this.uncheckedLabel;
    if (!label) {
      label = this.root.getAttribute('aria-label') || this.root.title
    }
    return label
  }

  render() {
    return (
      <div class={this.checked ? 'genesys-checked' : ''} 
            tabindex={this.disabled ? '' : '0'}
            role='checkbox'
            aria-checked={this.checked + ''}
            aria-label={this.getAriaLabel()} 
            onClick={()=> this.toggle()} 
            onKeyDown={(e) => this.onKeyDown(e)}>

        <div class="genesys-switch" 
              role='presentation'>
          <input type="checkbox" 
                  checked={this.checked} 
                  onInput={(e) => this.emitInput(e)} 
                  disabled={this.disabled} />
          <span class="genesys-slider genesys-round"></span>
        </div>
        { 
          this.uncheckedLabel && this.checkedLabel ?
          <span>{this.checked ? this.checkedLabel : this.uncheckedLabel}</span>
          : ''
        }
      </div>
    );
  }
}