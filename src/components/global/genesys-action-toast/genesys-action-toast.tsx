import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  styleUrl: 'genesys-action-toast.less',
  tag: 'genesys-action-toast'
})
export class GenesysActionToast {
  @Event()
  buttonClick: EventEmitter;
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
   * The top border color of the toast.
   */
  @Prop()
  topBorderColor: string;
  /**
   * The subject of the toast.
   */
  @Prop()
  subject: string;
  /**
   * The key values of the toast.
   */
  @Prop()
  keyValues: { [key: string]: string; } = {};
  /**
   * The left button.
   */
  @Prop()
  secondaryButton: any;
  /**
   * The right button.
   */
  @Prop()
  primaryButton: any;

  onButtonClickHandler(button) {
    if (button.callback) {
      button.callback(this.idToast, this);
    }
    this.buttonClick.emit({ idToast: this.idToast, button });
  }

  render() {
    return (
      <div class="genesys-action-toast">
        <div class="top-border" style={{ 'background-color': this.topBorderColor }} />
        <div class="header">
          {this.icon ? (
            <i class={this.icon} />
          ) : this.iconUri ? (
            <img src={this.iconUri} />
          ) : (
            ''
          )}
          <h2>{this.toastTitle}</h2>
        </div>
        <div class="content">
          <div class="key-values-area">
            {Object.keys(this.keyValues).map(key => {
              return [
                <div class="label">{key}</div>,
                <div>{this.keyValues[key]}</div>
              ];
            })}
          </div>
          <div class="subject">{this.subject}</div>
          <div class="message">{this.message}</div>
        </div>
        <div class="buttons">
          {this.secondaryButton && (
            <genesys-button
              text={this.secondaryButton.text}
              left-icon={this.secondaryButton.leftIcon}
              right-icon={this.secondaryButton.rightIcon}
              accent=""
              disabled={this.secondaryButton.disabled}
              title={this.secondaryButton.title ? this.secondaryButton.title : ''}
              onClick={() => this.onButtonClickHandler(this.secondaryButton)}
              class="left-button"
            />
          )}
          {this.primaryButton && (
            <genesys-button
              text={this.primaryButton.text}
              left-icon={this.primaryButton.leftIcon}
              right-icon={this.primaryButton.rightIcon}
              accent="primary"
              disabled={this.primaryButton.disabled}
              title={this.primaryButton.title ? this.primaryButton.title : ''}
              onClick={() => this.onButtonClickHandler(this.primaryButton)}
              class="right-button"
            />
          )}
        </div>
      </div>
    );
  }
}
