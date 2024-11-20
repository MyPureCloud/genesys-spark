import { Component, Element, JSX, h, Listen, Prop } from '@stencil/core';
import { capitalizeFirstLetter } from '@utils/string/capitalize-first-letter';
import { trackComponent } from '@utils/tracking/usage';
import { GuxTableToolbarActionTypes } from './gux-table-toolbar-action.types';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { GuxTableToolbarActionAccent } from '../gux-table-toolbar-action-accents.types';

@Component({
  styleUrl: 'gux-table-toolbar-action.scss',
  tag: 'gux-table-toolbar-action',
  shadow: true
})
export class GuxTableToolbarAction {
  private i18n: GetI18nValue;

  @Element()
  root: HTMLElement;

  @Prop()
  action: GuxTableToolbarActionTypes;

  @Prop()
  accent: GuxTableToolbarActionAccent = 'secondary';

  @Prop()
  iconOnly: boolean = false;

  @Prop()
  disabled: boolean = false;

  /**
   * This is meant to be an internal property. It is not recommended to be used.
   */
  @Prop()
  condensedLayout: boolean = false;

  @Listen('click', { capture: true })
  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private returnActionLocale(action: GuxTableToolbarActionTypes): string {
    return this.i18n(`action${capitalizeFirstLetter(action)}`);
  }

  private returnActionTypeIcon(action: GuxTableToolbarActionTypes): string {
    switch (action) {
      case 'refresh':
        return 'fa/arrows-rotate-regular';
      case 'delete':
        return 'fa/trash-regular';
      case 'export':
        return 'fa/arrow-up-from-line-regular';
      case 'import':
        return 'fa/file-import-regular';
      case 'revert':
        return 'fa/arrow-rotate-left-regular';
      case 'add':
        return 'fa/plus-regular';
      default:
        return 'fa/square-x-regular';
    }
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <gux-table-toolbar-custom-action
        icon-only={this.iconOnly && !this.condensedLayout}
        accent={this.accent}
        disabled={this.disabled}
      >
        <span slot="text">{this.returnActionLocale(this.action)}</span>
        <gux-icon
          slot="icon"
          icon-name={this.returnActionTypeIcon(this.action)}
          decorative
        ></gux-icon>
      </gux-table-toolbar-custom-action>
    ) as JSX.Element;
  }
}
