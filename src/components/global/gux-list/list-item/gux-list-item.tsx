import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop
} from '@stencil/core';
import { Watch } from '@stencil/core';
import { KeyCode } from '../../../../common-enums';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item'
})
export class GuxListItem {
  @Element()
  root: HTMLElement;

  /**
   * Disables the list item.
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The value to display.
   */
  @Prop()
  text: string;

  /**
   * The value associated with this item.
   */
  @Prop()
  value: any;

  /**
   * Emits when the list item action is triggered.
   */
  @Event()
  action: EventEmitter<any>;

  @Watch('disabled')
  disabledChanged(newValue: boolean): void {
    if (newValue) {
      this.root.classList.add('disabled');
    } else {
      this.root.classList.remove('disabled');
    }
  }

  @Listen('click')
  handleClick() {
    this.onItemClicked();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.Enter || event.keyCode === KeyCode.Space) {
      this.onItemClicked();
    }
  }

  render() {
    return (
      <span class="list-item">
        {this.text && <gux-text-highlight text={this.text} />}
        <slot />
      </span>
    );
  }

  /**
   * Once the component is loaded
   */
  componentDidLoad() {
    this.root.setAttribute('role', 'listitem');
    this.disabledChanged(this.disabled);
  }
  /**
   * Once the component is updated
   */
  componentDidUpdate() {
    this.root.setAttribute('role', 'listitem');
    this.disabledChanged(this.disabled);
  }

  private onItemClicked(): void {
    this.emitAction();
  }

  private emitAction() {
    this.action.emit(this.value);
  }
}
