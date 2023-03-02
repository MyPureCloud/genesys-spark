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

export function expandActions(
  actions:
    | HTMLGuxTableToolbarCustomActionElement[]
    | HTMLGuxTableToolbarCustomActionElement
): void {
  ([].concat(actions) as HTMLGuxTableToolbarCustomActionElement[]).forEach(
    action => {
      if (action != null) {
        action.iconOnly = false;
      }
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
      if (action != null) {
        action.iconOnly = true;
      }
    }
  );
}

export function collapseActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): void {
  (
    [].concat(
      actionsFilterContextual,
      actionsPerm,
      actionPrimary
    ) as HTMLGuxTableToolbarCustomActionElement[]
  ).forEach(action => {
    if (action != null) {
      action.iconOnly = true;
    }
  });
}

export function expandActionsAll(
  actionsFilterContextual: HTMLGuxTableToolbarCustomActionElement[],
  actionsPerm: HTMLGuxTableToolbarCustomActionElement[],
  actionPrimary: HTMLGuxTableToolbarCustomActionElement
): void {
  (
    [].concat(
      actionsPerm,
      actionPrimary,
      actionsFilterContextual
    ) as HTMLGuxTableToolbarCustomActionElement[]
  ).forEach(action => {
    if (action != null) {
      action.iconOnly = false;
    }
  });
}
