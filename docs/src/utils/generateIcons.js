const { removeDisabledFailures } = require('tslint');

const icons = [
  { sectionName: 'Agent', iconNames: ['agent', 'agent-group', 'agent-circle'] },
  {
    sectionName: 'User',
    iconNames: [
      'user',
      'user-interactions',
      'user-add',
      'user-group',
      'user-contact-id',
      'user-circle',
      'user-directory',
      'user-interactions-disable'
    ]
  },
  { sectionName: 'Co-Browse', iconNames: ['cobrowse'] },
  {
    sectionName: 'Faces',
    iconNames: [
      'face-happy',
      'face-neutral',
      'face-sad',
      'face-happy-solid',
      'face-sad-solid'
    ]
  },
  {
    sectionName: 'CJV',
    iconNames: [
      'cjv-default-event',
      'cjv-form-abandoned',
      'cjv-form-submitted',
      'cjv-offer-closed',
      'cjv-offer-ignored',
      'cjv-offer-offered',
      'cjv-offer-opened',
      'cjv-outcome-achieved',
      'cjv-page-view',
      'cjv-product-added',
      'cjv-product-purchased',
      'cjv-product-removed',
      'cjv-search',
      'cjv-segment-assigned',
      'cjv-segment',
      'cjv-webchat-accepted',
      'cjv-webchat-error',
      'cjv-webchat-ignored',
      'cjv-webchat-offered',
      'cjv-webchat-rejected',
      'cjv-webchat-requested',
      'cjv-webchat-submitted',
      'cjv-webchat-timeout',
      'cjv-custom-default',
      'cjv-web-session',
      'cjv-delivery',
      'cjv-policy-contract',
      'cjv-generic-application',
      'cjv-finance-invoice'
    ]
  },
  {
    sectionName: 'Product Logos',
    iconNames: ['product-logo-beyond', 'product-logo-g']
  },
  {
    sectionName: 'Left Toolbar',
    iconNames: [
      'toolbar-interactions',
      'toolbar-interactions-disable',
      'toolbar-assist',
      'toolbar-assist-disable',
      'toolbar-chat',
      'toolbar-chat-disable',
      'toolbar-phone',
      'toolbar-phone-disable',
      'toolbar-phone-active-1',
      'toolbar-phone-active-2',
      'toolbar-phone-active-3',
      'toolbar-video',
      'toolbar-video-disable',
      'toolbar-apps',
      'toolbar-apps-disable',
      'toolbar-favourite',
      'toolbar-notification',
      'toolbar-inbox',
      'toolbar-help'
    ]
  },
  {
    sectionName: 'Phone',
    iconNames: [
      'phone',
      'phone-forward',
      'phone-bell',
      'phone-voice',
      'phone-disable',
      'phone-close',
      'phone-hold',
      'phone-conference',
      'phone-call-history',
      'phone-outbound',
      'phone-missed-call',
      'phone-callback',
      'phone-hangup',
      'voicemail',
      'phone-inbound',
      'phone-dialpad'
    ]
  },
  {
    sectionName: 'Chat',
    iconNames: ['chat', 'chat-close', 'chat-disable', 'chat-multi', 'chat-bell']
  },
  {
    sectionName: 'Message',
    iconNames: [
      'message-email',
      'message-reply',
      'message-reply-all',
      'message-forward',
      'send',
      'inbox',
      'attachment'
    ]
  },
  {
    sectionName: 'Video / Microphone',
    iconNames: [
      'video',
      'video-disable',
      'microphone',
      'microphone-disable',
      'microphone-talking'
    ]
  },
  {
    sectionName: 'Audio',
    iconNames: [
      'volume-up',
      'volume-down',
      'volume-none',
      'volume-disable',
      'music'
    ]
  },
  {
    sectionName: 'Media PLayer',
    iconNames: [
      'control-skip-left',
      'control-skip-right',
      'control-start',
      'control-end',
      'control-slide-forward',
      'control-slide-back',
      'control-play',
      'control-stop',
      'control-pause'
    ]
  },
  {
    sectionName: 'Devices',
    iconNames: [
      'device-pc',
      'webcam',
      'webcam-disable',
      'sms',
      'sms-close',
      'device-laptop',
      'device-tablet',
      'device-camera',
      'device-server',
      'device-cellphone',
      'device-headphones'
    ]
  },
  { sectionName: 'Folder', iconNames: ['folder', 'folder-open', 'folder-add'] },
  {
    sectionName: 'File Types',
    iconNames: [
      'file',
      'file-all',
      'file-report',
      'file-image-landscape',
      'file-image-portrait',
      'file-text',
      'file-preview',
      'file-audio',
      'file-video'
    ]
  },
  {
    sectionName: 'File Transfer',
    iconNames: ['upload', 'download', 'export', 'import']
  },
  { sectionName: 'External Link', iconNames: ['external-link'] },
  {
    sectionName: 'Comments',
    iconNames: ['comments', 'thumbs-up', 'thumbs-down']
  },
  {
    sectionName: 'Editing',
    iconNames: [
      'edit',
      'clone',
      'copy',
      'paste',
      'clipboard',
      'cut',
      'delete',
      'refresh',
      'reset'
    ]
  },
  {
    sectionName: 'Resizing Controls',
    iconNames: [
      'window-popout',
      'window-contract',
      'window-fullscreen',
      'window-drag-out',
      'window-actual-size'
    ]
  },
  {
    sectionName: 'Apps',
    iconNames: ['app-generic', 'app-chart', 'app-layout', 'app-table']
  },
  {
    sectionName: 'Miscellaneous',
    iconNames: [
      'add-circle',
      'timeline',
      'clock',
      'clock-outline',
      'quote-right',
      'quote-left',
      'bot',
      'skills',
      'campaign',
      'bolt',
      'palette',
      'tenant',
      'lunch',
      'configuration',
      'stamp',
      'record',
      'follow',
      'scripter',
      'paint',
      'resource',
      'post',
      'fire',
      'dash',
      'bus',
      'notification',
      'generic',
      'low-bandwidth',
      'trade',
      'unknown'
    ]
  },
  {
    sectionName: 'Settings',
    iconNames: [
      'settings',
      'lock',
      'unlock',
      'link',
      'unlink',
      'certificate',
      'key',
      'sun',
      'moon',
      'view-all',
      'view-cells',
      'view-lists',
      'view-list',
      'view-stacked',
      'view-grid',
      'view-roster',
      'inspect',
      'inspect-disable',
      'coaching'
    ]
  },
  {
    sectionName: 'Social Media',
    iconNames: [
      'rss',
      'twitter',
      'facebook',
      'viber',
      'whatsapp',
      'line-messenger',
      'wechat',
      'telegram',
      'share',
      'at',
      'retweet'
    ]
  },
  {
    sectionName: 'Arrows',
    iconNames: [
      'arrow-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up-right',
      'arrow-up-left',
      'arrow-down-right',
      'arrow-down-left',
      'chevron-right',
      'chevron-left'
    ]
  },
  { sectionName: 'Sets', iconNames: ['transfer'] },
  {
    sectionName: 'Charts',
    iconNames: [
      'graph-bar-horizontal',
      'graph-bar-vertical',
      'graph-line',
      'graph-chart',
      'graph-spark',
      'graph-bubble',
      'graph-pie'
    ]
  },
  {
    sectionName: 'Location',
    iconNames: [
      'pin-location',
      'pin',
      'server',
      'globe',
      'home',
      'cloud',
      'cloud-outline',
      'site'
    ]
  },
  {
    sectionName: 'UI Icons',
    iconNames: [
      'search',
      'calendar',
      'checkbox',
      'checkbox-active',
      'checkbox-partial',
      'checkmark',
      'radio',
      'radio-active',
      'add',
      'close',
      'arrow-solid-up',
      'arrow-solid-down',
      'arrow-solid-left',
      'arrow-solid-right',
      'chevron-small-down',
      'chevron-small-up',
      'chevron-small-left',
      'chevron-small-right',
      'chevron-double-left',
      'chevron-double-right',
      'menu-kebab-vertical',
      'menu',
      'menu-kebab-horizontal',
      'rating-active',
      'rating',
      'rating-partial',
      'filter',
      'logout',
      'alert-success',
      'alert-warning-triangle',
      'alert-warning-octogon',
      'grab-horizontal',
      'grab-vertical',
      'collapse',
      'expand',
      'tag',
      'tag-add',
      'tag-remove'
    ]
  },
  { sectionName: 'Alerts', iconNames: ['bell', 'bug', 'alert-info', 'help'] },
  { sectionName: 'Zoom', iconNames: ['zoom-in', 'zoom-out'] }
];

function generateSection(sectionName, iconNames) {
  let output = `<h2>${sectionName}</h2>`;

  output += '<div class="icons-container">';
  iconNames.forEach(iconName => {
    output += `<div class="icon-example">
    <gux-icon icon-name="${iconName}" class="example" decorative="true"></gux-icon>
    <div class="icon-name">${iconName}</div>
  </div>`;
  });
  output += '</div>';

  return output;
}

function generateHTML() {
  return icons.reduce(
    (acc, cv) => acc + generateSection(cv.sectionName, cv.iconNames),
    ''
  );
}

exports.generateHTML = generateHTML;
