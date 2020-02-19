import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  styleUrl: 'gux-disclosure-button.less',
  tag: 'gux-disclosure-button'
})
export class GuxDisclosureButton {
  /**
   * Indicates the position of the button panel (right or left)
   */
  @Prop()
  position: string = 'left';

  /**
   * Indicates the label for the disclosure button
   */
  @Prop()
  label: string = 'open';

  /**
   * Used to open or close the disclosure panel
   */
  @Prop({ mutable: true })
  isOpen: boolean = false;

  /**
   * Indicated image used by button
   */
  @State()
  buttonImg: string = 'genesys-icon-expand-right';

  /**
   * Return the state of the components panel on state change
   * @return the panel state
   */
  @Event()
  active: EventEmitter;
  changeState() {
    this.togglePanel();
    this.active.emit(this.isOpen);
  }

  togglePanel() {
    this.isOpen = !this.isOpen;
    this.setButtonImg();
  }

  setButtonImg() {
    if (this.position === 'right') {
      this.buttonImg = this.isOpen
        ? 'genesys-icon-expand-right'
        : 'genesys-icon-expand-left';
    } else {
      this.buttonImg = this.isOpen
        ? 'genesys-icon-expand-left'
        : 'genesys-icon-expand-right';
    }
  }

  componentWillLoad() {
    this.setButtonImg();
  }

  render() {
    const activeClass = this.isOpen ? 'active' : '';
    return (
      <div class={`disclosure-button-container ${this.position}`}>
        <button
          class={`disclosure-button ${this.buttonImg}`}
          aria-label={this.label}
          onClick={() => this.changeState()}
        />
        <div class={`disclosure-panel ${this.position} ${activeClass}`}>
          <slot name="panel-content" />
        </div>
      </div>
    );
  }
}
