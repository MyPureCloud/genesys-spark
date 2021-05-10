const { removeDisabledFailures } = require('tslint');

const icons = [
  { sectionName: 'Agent', iconNames: ['agent', 'agent-circle', 'agent-group'] },
  {
    sectionName: 'User',
    iconNames: [
      'user',
      'user-add',
      'user-circle',
      'user-contact-id',
      'user-directory',
      'user-group',
      'user-interactions',
      'user-interactions-disable'
    ]
  },
  { sectionName: 'Co-Browse', iconNames: ['cobrowse'] },
  {
    sectionName: 'Faces',
    iconNames: [
      'face-happy',
      'face-happy-solid',
      'face-neutral',
      'face-sad',
      'face-sad-solid'
    ]
  },
  {
    sectionName: 'CJV',
    iconNames: [
      'cjv-custom-default',
      'cjv-default-event',
      'cjv-delivery',
      'cjv-finance-invoice',
      'cjv-form-abandoned',
      'cjv-form-submitted',
      'cjv-generic-application',
      'cjv-offer-closed',
      'cjv-offer-ignored',
      'cjv-offer-offered',
      'cjv-offer-opened',
      'cjv-outcome-achieved',
      'cjv-page-view',
      'cjv-policy-contract',
      'cjv-product-added',
      'cjv-product-purchased',
      'cjv-product-removed',
      'cjv-search',
      'cjv-segment',
      'cjv-segment-assigned',
      'cjv-web-session',
      'cjv-webchat-accepted',
      'cjv-webchat-error',
      'cjv-webchat-ignored',
      'cjv-webchat-offered',
      'cjv-webchat-rejected',
      'cjv-webchat-requested',
      'cjv-webchat-submitted',
      'cjv-webchat-timeout'
    ]
  },
  {
    sectionName: 'Product Logos',
    iconNames: ['product-logo-beyond', 'product-logo-g']
  },
  {
    sectionName: 'Left Toolbar',
    iconNames: [
      'toolbar-apps',
      'toolbar-apps-disable',
      'toolbar-assist',
      'toolbar-assist-disable',
      'toolbar-chat',
      'toolbar-chat-disable',
      'toolbar-favourite',
      'toolbar-help',
      'toolbar-inbox',
      'toolbar-interactions',
      'toolbar-interactions-disable',
      'toolbar-notification',
      'toolbar-phone',
      'toolbar-phone-active-1',
      'toolbar-phone-active-2',
      'toolbar-phone-active-3',
      'toolbar-phone-disable',
      'toolbar-video',
      'toolbar-video-disable'
    ]
  },
  {
    sectionName: 'Phone',
    iconNames: [
      'phone',
      'phone-bell',
      'phone-call-history',
      'phone-callback',
      'phone-close',
      'phone-conference',
      'phone-dialpad',
      'phone-disable',
      'phone-forward',
      'phone-hangup',
      'phone-hold',
      'phone-inbound',
      'phone-missed-call',
      'phone-outbound',
      'phone-voice',
      'voicemail'
    ]
  },
  {
    sectionName: 'SMS',
    iconNames: ['sms', 'sms-close']
  },
  {
    sectionName: 'Chat',
    iconNames: ['chat', 'chat-bell', 'chat-close', 'chat-disable', 'chat-multi']
  },
  {
    sectionName: 'Message',
    iconNames: [
      'attachment',
      'inbox',
      'message-email',
      'message-forward',
      'message-reply',
      'message-reply-all',
      'send'
    ]
  },
  {
    sectionName: 'Video / Microphone',
    iconNames: [
      'microphone',
      'microphone-disable',
      'microphone-talking',
      'video',
      'video-disable',
      'webcam',
      'webcam-disable'
    ]
  },
  {
    sectionName: 'Audio',
    iconNames: [
      'music',
      'record',
      'volume-disable',
      'volume-down',
      'volume-none',
      'volume-up'
    ]
  },
  {
    sectionName: 'Media PLayer',
    iconNames: [
      'control-end',
      'control-pause',
      'control-play',
      'control-skip-left',
      'control-skip-right',
      'control-slide-back',
      'control-slide-forward',
      'control-start',
      'control-stop'
    ]
  },
  {
    sectionName: 'Devices',
    iconNames: [
      'device-camera',
      'device-cellphone',
      'device-headphones',
      'device-laptop',
      'device-pc',
      'device-server',
      'device-tablet'
    ]
  },
  { sectionName: 'Folder', iconNames: ['folder', 'folder-add', 'folder-open'] },
  {
    sectionName: 'File Types',
    iconNames: [
      'file',
      'file-all',
      'file-audio',
      'file-image-landscape',
      'file-image-portrait',
      'file-preview',
      'file-report',
      'file-text',
      'file-video'
    ]
  },
  {
    sectionName: 'File Transfer',
    iconNames: ['download', 'export', 'import', 'upload']
  },
  { sectionName: 'External Link', iconNames: ['external-link'] },
  {
    sectionName: 'Comments',
    iconNames: ['comments', 'comments-disable', 'thumbs-down', 'thumbs-up']
  },
  {
    sectionName: 'Editing',
    iconNames: [
      'clipboard',
      'clone',
      'copy',
      'cut',
      'delete',
      'edit',
      'paste',
      'refresh',
      'reset'
    ]
  },
  {
    sectionName: 'Resizing Controls',
    iconNames: [
      'window-actual-size',
      'window-contract',
      'window-drag-out',
      'window-fullscreen',
      'window-popout'
    ]
  },
  {
    sectionName: 'Apps',
    iconNames: ['app-chart', 'app-generic', 'app-layout', 'app-table']
  },
  {
    sectionName: 'Time',
    iconNames: ['clock', 'clock-outline', 'timeline']
  },
  {
    sectionName: 'Miscellaneous',
    iconNames: [
      'add-circle',
      'bolt',
      'bot',
      'bus',
      'campaign',
      'configuration',
      'dash',
      'fire',
      'follow',
      'generic',
      'low-bandwidth',
      'lunch',
      'paint',
      'palette',
      'pin',
      'post',
      'quote-left',
      'quote-right',
      'resource',
      'scripter',
      'skills',
      'stamp',
      'tenant',
      'trade',
      'unknown'
    ]
  },
  {
    sectionName: 'Settings',
    iconNames: [
      'certificate',
      'coaching',
      'inspect',
      'inspect-disable',
      'key',
      'link',
      'lock',
      'moon',
      'settings',
      'sun',
      'unlink',
      'unlock',
      'view-all',
      'view-cells',
      'view-grid',
      'view-list',
      'view-lists',
      'view-roster',
      'view-stacked'
    ]
  },
  {
    sectionName: 'Social Media',
    iconNames: [
      'at',
      'facebook',
      'line-messenger',
      'retweet',
      'rss',
      'share',
      'telegram',
      'twitter',
      'viber',
      'wechat',
      'whatsapp'
    ]
  },
  {
    sectionName: 'Arrows',
    iconNames: [
      'arrow-down',
      'arrow-down-left',
      'arrow-down-right',
      'arrow-left',
      'arrow-right',
      'arrow-up',
      'arrow-up-left',
      'arrow-up-right',
      'chevron-left',
      'chevron-right'
    ]
  },
  { sectionName: 'Sets', iconNames: ['transfer'] },
  {
    sectionName: 'Charts',
    iconNames: [
      'graph-bar-horizontal',
      'graph-bar-vertical',
      'graph-bubble',
      'graph-chart',
      'graph-line',
      'graph-pie',
      'graph-spark'
    ]
  },
  {
    sectionName: 'Location',
    iconNames: [
      'cloud',
      'cloud-outline',
      'globe',
      'home',
      'pin-location',
      'server',
      'site'
    ]
  },
  {
    sectionName: 'UI Icons',
    iconNames: [
      'add',
      'alert-success',
      'alert-warning-octogon',
      'alert-warning-triangle',
      'arrow-solid-down',
      'arrow-solid-left',
      'arrow-solid-right',
      'arrow-solid-up',
      'calendar',
      'checkbox',
      'checkbox-active',
      'checkbox-partial',
      'checkmark',
      'chevron-double-left',
      'chevron-double-right',
      'chevron-small-down',
      'chevron-small-left',
      'chevron-small-right',
      'chevron-small-up',
      'close',
      'collapse',
      'expand',
      'filter',
      'grab-horizontal',
      'grab-vertical',
      'logout',
      'menu',
      'menu-kebab-horizontal',
      'menu-kebab-vertical',
      'radio',
      'radio-active',
      'rating',
      'rating-active',
      'rating-partial',
      'search',
      'tag',
      'tag-add',
      'tag-remove'
    ]
  },
  {
    sectionName: 'Alerts',
    iconNames: ['alert-info', 'bell', 'bug', 'help', 'notification']
  },
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
