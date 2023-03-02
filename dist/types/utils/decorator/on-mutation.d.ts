import { ComponentInterface } from '../../stencil-public-runtime';
declare type OnMutationDecorator = (target: ComponentInterface, propertyKey: string) => void;
export declare function OnMutation(opt: MutationObserverInit): OnMutationDecorator;
export {};
