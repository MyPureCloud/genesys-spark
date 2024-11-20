import { GuxTableToolbarActionAccent } from './gux-table-toolbar-action-accents.types';

export function setAccent(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement,
  accent: GuxTableToolbarActionAccent
): void {
  ([].concat(actions) as HTMLGuxTableToolbarCustomActionElement[]).forEach(
    action => {
      if (action != null) {
        action.accent = accent;
      }
    }
  );
}

export function setActionsIconOnlyProp(
  iconOnly: boolean,
  condensedLayout: boolean,
  ...actionSets: HTMLGuxTableToolbarCustomActionElement[]
): void {
  actionSets
    .flat()
    .filter(action => action !== null && action !== undefined)
    .forEach(action => {
      if (!action.hasAttribute('icon-only')) {
        action.iconOnly = iconOnly;
      }
      action.condensedLayout = condensedLayout;
    });
}
