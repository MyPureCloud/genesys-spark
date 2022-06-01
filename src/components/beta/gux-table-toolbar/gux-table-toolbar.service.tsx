import { isArray } from 'vega';
import { GuxTableToolbarActionAccent } from './gux-table-toolbar-action-accents.types';

export function setAccent(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement,
  accent: GuxTableToolbarActionAccent
): GuxTableToolbarActionAccent {
  if (isArray(actions)) {
    actions.forEach(action => {
      return (action.accent = accent);
    });
  } else {
    return (actions.accent = accent);
  }
}

export function expandActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): boolean {
  if (isArray(actions)) {
    Boolean(
      actions.forEach(action => {
        return (action.iconOnly = false);
      })
    );
  } else {
    return (actions.iconOnly = false);
  }
}

export function collapseActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): boolean {
  if (isArray(actions)) {
    Boolean(
      actions.forEach(action => {
        return (action.iconOnly = true);
      })
    );
  } else {
    return (actions.iconOnly = true);
  }
}

export function collapseActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): boolean {
  const arrayActions = actionsPerm.concat(
    actionsFilterContextual,
    actionPrimary
  );
  return Boolean(
    arrayActions.forEach(action => {
      action.iconOnly = true;
    })
  );
}

export function expandActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): boolean {
  const arrayActions = actionsFilterContextual.concat(
    actionsPerm,
    actionPrimary
  );
  return Boolean(
    arrayActions.forEach(action => {
      action.iconOnly = false;
    })
  );
}
