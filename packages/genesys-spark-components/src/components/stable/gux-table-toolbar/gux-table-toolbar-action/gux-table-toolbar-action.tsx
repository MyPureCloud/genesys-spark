import { Component, Element, JSX, h, Prop } from '@stencil/core';
import { capitalizeFirstLetter } from '@utils/string/capitalize-first-letter';
import { trackComponent } from '@utils/tracking/usage';
import { GuxTableToolbarActionTypes } from './gux-table-toolbar-action.types';

import { buildI18nForComponent, GetI18nValue } from '../../../../i18n';
import translationResources from './i18n/en.json';
import { GuxTableToolbarActionAccent } from '../gux-table-toolbar-action-accents.types';

@Component({
  styleUrl: 'gux-table-toolbar-action.less',
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

  private returnActionLocale(action: GuxTableToolbarActionTypes): string {
    return this.i18n(`action${capitalizeFirstLetter(action)}`);
  }

  private returnActionTypeIcon(action: GuxTableToolbarActionTypes): string {
    return action == 'revert' ? 'reset' : action;
  }

  async componentWillLoad(): Promise<void> {
    trackComponent(this.root, { variant: this.action });
    this.i18n = await buildI18nForComponent(this.root, translationResources);
  }

  render(): JSX.Element {
    return (
      <gux-table-toolbar-custom-action
        icon-only={this.iconOnly}
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
