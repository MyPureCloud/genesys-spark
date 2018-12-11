import { Event, EventEmitter, Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'genesys-disclosure-button',
  styleUrl: 'genesys-disclosure-button.less'
})
export class GenesysDisclosureButton {
  /**
   * Indicates the position of the button panel (right or left)
   **/
  @Prop()
  position: string = 'left';

  /**
   * Denotes state of discloseure panel
   **/
  @State()
  isPanelActive: boolean = false;

  @State()
  buttonText: string = '>';

  /**
   * Return the state of the components panel on state chenge
   * @return the panel state
   */
  @Event()
  active: EventEmitter;

  togglePanel() {
    this.isPanelActive = !this.isPanelActive;
    if (this.position === 'right') {
      this.buttonText = this.isPanelActive ? '>' : '<';
    } else {
      this.buttonText = this.isPanelActive ? '<' : '>';
    }
    this.active.emit(this.isPanelActive);
  }

  componentDidLoad() {
    if (this.position === 'right') {
      this.buttonText = this.isPanelActive ? '>' : '<';
    } else {
      this.buttonText = this.isPanelActive ? '<' : '>';
    }
  }

  render() {
    return (
      <div class={`disclosure-button-container ${this.position}`}>
        <button onClick={() => this.togglePanel()}>{this.buttonText}</button>
        {this.isPanelActive && (
          <div class={`disclosure-panel ${this.position}`}>
            <slot name="panel-content" />
          </div>
        )}
      </div>
    );
  }
}
