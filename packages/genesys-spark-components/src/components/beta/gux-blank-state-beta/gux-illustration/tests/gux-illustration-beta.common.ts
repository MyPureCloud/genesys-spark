const variantRenderConfigs = [
  'add',
  'face-smile',
  'success',
  'calendar',
  'access',
  'recording',
  'data',
  'comments',
  'comment',
  'comment-question',
  'eye',
  'magnifying-glass',
  'magnifying-glass-question',
  'sparkles',
  'triangle-exclamation',
  'face-disappointed',
  'folder-magnifying-glass',
  'folder-open',
  'file',
  'lock',
  'message-bot',
  'robot',
  'message',
  'messages',
  'cloud',
  'article',
  'edit',
  'connection',
  'rectangle-history',
  'setting',
  'square-dashed',
  'square-plus',
  'transcription',
  'table',
  'user',
  'user-message',
  'users'
].map(variant => ({
  description: `should render component as expected with variant "${variant}"`,
  html: `<gux-illustration-beta variant="${variant}"></gux-illustration-beta>`
}));

const backgroundShapeRenderConfigs = [
  'solid-wide',
  'solid-narrow',
  'gradient-wide',
  'gradient-narrow'
].map(backgroundShape => ({
  description: `should render component as expected with background-shape "${backgroundShape}"`,
  html: `<gux-illustration-beta variant="data" background-shape="${backgroundShape}"></gux-illustration-beta>`
}));

const statusRenderConfigs = ['success', 'error', 'info', 'add'].map(status => ({
  description: `should render component as expected with status "${status}"`,
  html: `<gux-illustration-beta variant="add" status="${status}"></gux-illustration-beta>`
}));

const combinedRenderConfigs = [
  {
    description: 'should render component with variant and status',
    html: `<gux-illustration-beta variant="success" status="success"></gux-illustration-beta>`
  },
  {
    description: 'should render component with all properties',
    html: `<gux-illustration-beta variant="data" status="error" background-shape="gradient-wide"></gux-illustration-beta>`
  }
];

export const renderConfigs = [
  ...variantRenderConfigs,
  ...backgroundShapeRenderConfigs,
  ...statusRenderConfigs,
  ...combinedRenderConfigs
];
