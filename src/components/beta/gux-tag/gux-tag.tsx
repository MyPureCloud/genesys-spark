import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  JSX,
  Prop
} from '@stencil/core';
import tagResources from './i18n/en.json';
import { buildI18nForComponent, GetI18nValue } from '../../../i18n';

export type GuxTagColor =
  | 'default'
  | 'navy'
  | 'blue'
  | 'electric-purple'
  | 'aqua-green'
  | 'fuscha'
  | 'dark-purple'
  | 'bubblegum-pink'
  | 'olive-green'
  | 'lilac'
  | 'yellow-green';

@Component({
  styleUrl: 'gux-tag.less',
  tag: 'gux-tag-beta'
})
export class GuxTag {
  @Element()
  root: HTMLGuxTagBetaElement;

  /**
   * Triggered when click on close button
   */
  @Event()
  guxdelete: EventEmitter<string>;

  /**
   * Tag background color.
   */
  @Prop()
  color: GuxTagColor = 'default';

  /**
   * Index for remove tag
   */
  @Prop()
  value: string;

  private i18n: GetI18nValue;

  private handlerClickDeleteTag(): void {
    this.guxdelete.emit(this.value);
  }

  private getDeleteButton(): JSX.Element {
    return (
      <button
        class={`gux-tag-delete-button gux-${this.color}`}
        onClick={this.handlerClickDeleteTag.bind(this)}
        tabindex="0"
        type="button"
      >
        <gux-icon
          class="gux-tag-delete-icon"
          icon-name="ic-close"
          screenreader-text={this.i18n('delete-tag')}
        />
      </button>
    );
  }

  async componentWillRender(): Promise<void> {
    this.i18n = await buildI18nForComponent(this.root, tagResources);
  }

  render(): JSX.Element {
    return (
      <div class="gux-tag">
        <div class={`gux-tag-text gux-${this.color}`}>
          <slot />
        </div>
        {this.getDeleteButton()}
      </div>
    );
  }
}
