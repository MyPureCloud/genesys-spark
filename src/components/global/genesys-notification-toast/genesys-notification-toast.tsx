import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-notification-toast.less',
  tag: 'genesys-notification-toast'
})
export class GenesysNotificationToast {
  @Event()
  buttonClick: EventEmitter;

  /**
   * The component accent (alert warning positive or neutral).
   */
  @Prop()
  accent: string = 'neutral';

  /**
   * The toast title.
   */
  @Prop()
  toastTitle: string;
  /**
   * The id of the title.
   */
  @Prop()
  idToast: string;
  /**
   * The icon name of the title.
   */
  @Prop()
  icon: string;
  /**
   * The icon uri of the title.
   */
  @Prop()
  iconUri: string;
  /**
   * The message of the toast.
   */
  @Prop()
  message: string;

  /**
   * The label for the close button
   */
  @Prop()
  closeLabel: string = '';

  onButtonClickHandler(e) {
    this.buttonClick.emit({ idToast: this.idToast, originalEvent: e });
  }

  /**
   * This function is to check accent
   */
  getAccent() {
    const accent = this.accent.toLowerCase();
    const allowed = ['warning', 'alert', 'neutral', 'positive'];
    return allowed.includes(accent) ? accent : 'neutral';
  }

  getIcon() {
    return this.icon ? (
      <i class={this.icon} />
    ) : this.iconUri ? (
      <img src={this.iconUri} />
    ) : (
      ''
    )
  }

  render() {
    return (
      <div class="genesys-notification-toast">
        <div class={"icon-wrapper " + this.getAccent()}>
          {this.getIcon()}
        </div>
        <div class="content-wrapper">
          <div class="title" title={this.toastTitle}>
            {this.toastTitle}
          </div>
          <div class="message" title={this.message}>
            {this.message}
          </div>
        </div>
        <div class="close-icon-wrapper">
          <button
            onClick={e => this.onButtonClickHandler(e)}
            title={this.closeLabel}
          >
            <i class="genesys-icon-close" />
          </button>
        </div>
      </div>
    );
  }
}
