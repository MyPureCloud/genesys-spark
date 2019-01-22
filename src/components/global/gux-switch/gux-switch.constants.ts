export type AllowedLayouts = 'small' | 'medium' | 'large';

export interface ISwitchItem {
  displayName: string;
  isDisabled?: boolean;
  value: string;
}
