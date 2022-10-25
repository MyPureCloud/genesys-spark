import { GuxTableToolbarActionAccent } from './gux-table-toolbar-action-accents.types';

export function setAccent(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement,
  accent: GuxTableToolbarActionAccent
): void {
  ([].concat(actions) as HTMLGuxTableToolbarCustomActionElement[]).forEach(
    action => {
      action.accent = accent;
    }
  );
}

export function expandActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): void {
  ([].concat(actions) as HTMLGuxTableToolbarCustomActionElement[]).forEach(
    action => {
      action.iconOnly = false;
    }
  );
}

export function collapseActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): void {
  ([].concat(actions) as HTMLGuxTableToolbarCustomActionElement[]).forEach(
    action => {
      action.iconOnly = true;
    }
  );
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
  arrayActions.forEach(action => {
    action.iconOnly = true;
  });
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
  arrayActions.forEach(action => {
    action.iconOnly = false;
  });
}
