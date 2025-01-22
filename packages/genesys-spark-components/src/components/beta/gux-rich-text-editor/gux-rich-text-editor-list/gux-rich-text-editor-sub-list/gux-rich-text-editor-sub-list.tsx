import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift
} from '@floating-ui/dom';
import {
  Component,
  Element,
  Prop,
  State,
  Listen,
  Host,
  h
} from '@stencil/core';
import { next, previous } from 'components/stable/gux-list/gux-list.service';

@Component({
  tag: 'gux-rich-text-editor-sub-list',
  styleUrl: 'gux-rich-text-editor-sub-list.scss',
  shadow: { delegatesFocus: true }
})

/**
 * @slot - collection of gux-rich-style-list-item elements.
 */
export class GuxRichTextEditorSubList {
  private buttonElement: HTMLButtonElement;
  private subListElement: HTMLDivElement;
  private subListContentElement: HTMLDivElement;
  private cleanupUpdatePosition: ReturnType<typeof autoUpdate>;

  @Element()
  root: HTMLElement;

  @Prop()
  label: string;

  @State()
  isShown: boolean = false;

  @Listen('keydown')
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        event.stopPropagation();
        this.focusOnSubList();
        break;
      case 'ArrowUp':
        if (!(this.root === event.target)) {
          event.preventDefault();
          event.stopPropagation();
          previous(this.root, ['gux-rich-style-list-item']);
        }
        break;
      case 'ArrowDown':
        if (!(this.root === event.target)) {
          event.preventDefault();
          event.stopPropagation();
          next(this.root, ['gux-rich-style-list-item']);
        }
        break;
      case 'ArrowRight':
        event.stopPropagation();
        this.show();
        this.focusOnSubList();
        break;

      case 'ArrowLeft':
      case 'Escape':
        if (!(this.root === event.target)) {
          event.stopPropagation();
        }
        this.buttonElement.focus();
        break;
    }
  }

  @Listen('mouseenter')
  onMouseEnter() {
    this.show();
  }

  @Listen('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  @Listen('click')
  onClick(event: MouseEvent) {
    if ((event.target as Node).nodeName === 'GUX-RICH-STYLE-LIST-ITEM') {
      this.hide();
      return;
    }
  }

  @Listen('focusin')
  onFocusIn() {
    this.show();
  }

  @Listen('focusout')
  onFocusOut() {
    this.hide();
  }

  componentDidLoad(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    }
  }

  componentDidUpdate(): void {
    if (this.isShown) {
      this.runUpdatePosition();
    } else if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  disconnectedCallback(): void {
    if (this.cleanupUpdatePosition) {
      this.cleanupUpdatePosition();
    }
  }

  private focusOnSubList(): void {
    if (this.subListContentElement.contains(document.activeElement)) {
      return;
    }

    const listItems = Array.from(this.root.children);

    const nextFocusableElement =
      listItems[0] as HTMLGuxRichStyleListItemElement;

    void nextFocusableElement.focus();
  }

  private show(): void {
    this.isShown = true;
  }

  private hide(): void {
    if (this.isShown) {
      this.isShown = false;
    }
  }

  private runUpdatePosition(): void {
    if (this.root.isConnected) {
      this.cleanupUpdatePosition = autoUpdate(
        this.buttonElement,
        this.subListElement,
        () => this.updatePosition(),
        {
          ancestorScroll: true,
          elementResize: true,
          animationFrame: true,
          ancestorResize: true
        }
      );
    } else {
      this.disconnectedCallback();
    }
  }

  private updatePosition(): void {
    if (this.subListElement) {
      void computePosition(this.buttonElement, this.subListElement, {
        placement: 'right-start',
        strategy: 'fixed',
        middleware: [offset(4), flip(), shift()]
      }).then(({ x, y }) => {
        Object.assign(this.subListElement.style, {
          left: `${x}px`,
          top: `${y}px`
        });
      });
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <button
          type="button"
          class={{
            'gux-sub-list-button': true,
            'gux-sub-list-button-active': this.isShown
          }}
          tabIndex={-1}
          role="listitem"
          ref={el => (this.buttonElement = el)}
          aria-haspopup="true"
          aria-expanded={this.isShown.toString()}
        >
          <span class="gux-sub-list-button-text">{this.label}</span>
          <gux-icon
            size="small"
            icon-name="custom/chevron-right-small-regular"
            decorative
          ></gux-icon>
        </button>
        <div
          ref={el => (this.subListElement = el)}
          class={{
            'gux-sub-list-wrapper': true,
            'gux-shown': this.isShown
          }}
        >
          <div
            role="list"
            class="gux-sub-list-content"
            ref={el => (this.subListContentElement = el)}
          >
            <slot />
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
