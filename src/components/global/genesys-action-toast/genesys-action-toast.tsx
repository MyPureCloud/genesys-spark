import { Event, EventEmitter, Component, Prop } from '@stencil/core';

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
  keyValues: any = {};

  @Prop()
  leftButton: any;

  @Prop()
  rightButton: any;

  defaultButtonCallback(button) {
    if (button.callback) {
      button.callback(this.idToast, this);
    }
    this.buttonClick.emit({ idToast: this.idToast, button });
  }

  getStyle() {
    return { 'background-color': this.topBorderColor };
  }

  formatIcon(iconName: string) {
    return iconName.indexOf('genesys-icon') === 0
      ? iconName
      : 'genesys-icon-' + iconName;
  }

  render() {
    return (
      <div class="genesys-action-toast">
        <div class="top-border" style={this.getStyle()} />
        <div class="header">
          {this.icon ? (
            <i class={this.formatIcon(this.icon)} />
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
          {this.leftButton && (
            <genesys-button
              text={this.leftButton.text}
              left-icon={this.leftButton.leftIcon}
              right-icon={this.leftButton.rightIcon}
              accent=""
              disabled={this.leftButton.disabled}
              title={this.leftButton.title ? this.leftButton.title : ''}
              onClick={() => this.defaultButtonCallback(this.leftButton)}
              class="left-button"
            />
          )}
          {this.rightButton && (
            <genesys-button
              text={this.rightButton.text}
              left-icon={this.rightButton.leftIcon}
              right-icon={this.rightButton.rightIcon}
              accent="primary"
              disabled={this.rightButton.disabled}
              title={this.rightButton.title ? this.rightButton.title : ''}
              onClick={() => this.defaultButtonCallback(this.rightButton)}
              class="right-button"
            />
          )}
        </div>
      </div>
    );
  }
}
