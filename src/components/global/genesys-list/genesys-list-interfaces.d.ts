import {ListTypeEnum} from './genesys-list-enums'

export interface IListItem {
    type?:ListTypeEnum;
    text?: string;
    el?: HTMLLIElement;
    isDisabled?: boolean;
    callback?: any;
}