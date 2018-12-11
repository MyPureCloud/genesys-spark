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
  position: string = 'right';

  /**
   * Denotes state of discloseure panel
   **/
  @State()
  isPanelActive: boolean = false;

  /**
   * Return the state of the components panel on state chenge
   * @return the panel state
   */
  @Event()
  active: EventEmitter;
  togglePanel() {
    this.isPanelActive = !this.isPanelActive;
    this.active.emit(this.isPanelActive);
  }

  render() {
    return (
      <div class="disclosure-button-container">
        <button onClick={() => this.togglePanel()}>'>'</button>
        <div class="disclosure-panel">
          <slot name="panel-content" />
        </div>
      </div>
    );
  }
}
