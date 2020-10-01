import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

export type GuxDisclosureButtonPosition = 'left' | 'right';

@Component({
  styleUrl: 'gux-disclosure-button.less',
  tag: 'gux-disclosure-button'
})
export class GuxDisclosureButton {
  /**
   * Indicates the position of the button panel
   */
  @Prop()
  position: GuxDisclosureButtonPosition = 'left';

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
  icon: string = 'ic-expand-right';

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
    this.updateIcon();
  }

  updateIcon() {
    if (this.position === 'right') {
      this.icon = this.isOpen ? 'ic-expand-right' : 'ic-expand-left';
    } else {
      this.icon = this.isOpen ? 'ic-expand-left' : 'ic-expand-right';
    }
  }

  componentWillLoad() {
    this.updateIcon();
  }

  render() {
    const activeClass = this.isOpen ? 'active' : '';
    return (
      <div class={`disclosure-button-container ${this.position}`}>
        <button class="disclosure-button" onClick={() => this.changeState()}>
          <gux-icon
            icon-name={`${this.icon}`}
            screenreader-text={this.label}
          ></gux-icon>
        </button>
        <div class={`disclosure-panel ${this.position} ${activeClass}`}>
          <slot name="panel-content" />
        </div>
      </div>
    );
  }
}
