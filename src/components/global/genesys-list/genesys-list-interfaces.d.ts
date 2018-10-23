import {ListTypeEnum} from './genesys-list-enums'

export interface IListItem {
    type?:ListTypeEnum;
    text?: string;
    isDisabled?: boolean;
    callback?: any;
}