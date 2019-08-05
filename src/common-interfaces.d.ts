import { ListTypeEnum } from './common-enums';

export interface IListItem {
  type?: ListTypeEnum;
  text?: string;
  el?: HTMLLIElement;
  isDisabled?: boolean;
  callback?: any;
}
