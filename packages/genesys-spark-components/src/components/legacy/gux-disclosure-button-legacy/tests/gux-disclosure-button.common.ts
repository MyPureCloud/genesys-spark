export const renderConfigs = [
  '<gux-disclosure-button-legacy lang="en"><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" is-open><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" position="left"><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" is-open position="left"><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" position="right"><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" is-open position="right"><div slot="panel-content">content</div></gux-disclosure-button-legacy>',
  '<gux-disclosure-button-legacy lang="en" label="More Info"><div slot="panel-content">content</div></gux-disclosure-button-legacy>'
].map(html => ({ html }));

export const closedRenderConfig = {
  html: '<gux-disclosure-button-legacy lang="en"><div slot="panel-content">content</div></gux-disclosure-button-legacy>'
};
export const openRenderConfig = {
  html: '<gux-disclosure-button-legacy lang="en" is-open><div slot="panel-content">content</div></gux-disclosure-button-legacy>'
};
