import { ListTypeEnum } from './common-enums';

export interface IListItem {
  type?: ListTypeEnum;
  text?: string;
  el?: HTMLLIElement;
  description?: string;
  isDisabled?: boolean;
  callback?: any;
}
