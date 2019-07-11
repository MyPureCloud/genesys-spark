import { ListTypeEnum, ActionTypeEnum } from './common-enums';

export interface IListItem {
  type?: ListTypeEnum;
  text?: string;
  description?: string;
  el?: HTMLLIElement;
  isDisabled?: boolean;
  callback?: any;
}

export interface ICommand {
  text: string;
  details?: string;
  type?: ActionTypeEnum;
  callback(): void;
  shortcut?: string;
}
