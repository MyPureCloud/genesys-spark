import { ComponentInterface } from '../../stencil-public-runtime';
declare type OnClickOutsideDecorator = (target: ComponentInterface, propertyKey: string) => void;
declare type OnClickOutsideCallback = (event: MouseEvent) => void;
declare interface OnClickOutsideOptions {
  triggerEvents?: string;
  exclude?: string;
}
export declare function OnClickOutside(opt?: OnClickOutsideOptions): OnClickOutsideDecorator;
export declare function registerOnClickOutside(component: ComponentInterface, element: HTMLElement, callback: OnClickOutsideCallback, opt?: OnClickOutsideOptions): void;
export declare function removeOnClickOutside(component: ComponentInterface, element: HTMLElement, callback: OnClickOutsideCallback, opt?: OnClickOutsideOptions): void;
export {};
