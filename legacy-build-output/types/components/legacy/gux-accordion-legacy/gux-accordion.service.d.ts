import { IGuxAccordionLegacySection } from './gux-accordion.types';
export declare function getSections(root: HTMLElement): IGuxAccordionLegacySection[];
export declare function modifyClassList(slotName: string, modification: 'add' | 'remove' | 'toggle', sections: IGuxAccordionLegacySection[]): void;
export declare function onKeyboardNavigation(event: KeyboardEvent, slotName: string, sections: IGuxAccordionLegacySection[]): void;
