import { ListTypeEnum } from './common-enums';

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
  callback(): void;
  shortcut?: string;
}
