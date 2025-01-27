import { GUX_AVATAR_AUTO_ACCENT } from './gux-avatar.service';

export type GuxAvatarSize = 'xsmall' | 'small' | 'medium' | 'large';

export type GuxAvatarUcIntegrationApps = 'teams' | 'zoom' | '8x8' | 'none';

type GuxAvatarAutoAccent = `${(typeof GUX_AVATAR_AUTO_ACCENT)[number]}`;

export type GuxAvatarAccent =
  | 'default'
  | 'auto'
  | 'inherit'
  | GuxAvatarAutoAccent;

export type GuxAvatarPresence =
  | 'available'
  | 'away'
  | 'break'
  | 'busy'
  | 'meal'
  | 'meeting'
  | 'idle'
  | 'on-queue'
  | 'offline'
  | 'out-of-office'
  | 'training'
  | 'none';
