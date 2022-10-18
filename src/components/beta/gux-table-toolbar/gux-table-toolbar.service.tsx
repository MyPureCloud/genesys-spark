import { isArray } from 'vega';
import { GuxTableToolbarActionAccent } from './gux-table-toolbar-action-accents.types';

export function setAccent(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement,
  accent: GuxTableToolbarActionAccent
): void {
  if (isArray(actions)) {
    actions.forEach(action => {
      action.accent = accent;
    });
  } else {
    actions.accent = accent;
  }
}

export function expandActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): void {
  if (isArray(actions)) {
    Boolean(
      actions.forEach(action => {
        action.iconOnly = false;
      })
    );
  } else {
    actions.iconOnly = false;
  }
}

export function collapseActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): void {
  if (isArray(actions)) {
    Boolean(
      actions.forEach(action => {
        action.iconOnly = true;
      })
    );
  } else {
    actions.iconOnly = true;
  }
}

export function collapseActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): void {
  const arrayActions = actionsPerm.concat(
    actionsFilterContextual,
    actionPrimary
  );
  Boolean(
    arrayActions.forEach(action => {
      action.iconOnly = true;
    })
  );
}

export function expandActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): void {
  const arrayActions = actionsFilterContextual.concat(
    actionsPerm,
    actionPrimary
  );
  Boolean(
    arrayActions.forEach(action => {
      action.iconOnly = false;
    })
  );
}
