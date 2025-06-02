export const renderConfig = {
  description: 'should render gux-tab-list',
  html: `<gux-tab-list slot="tab-list">
    <gux-tab tab-id="2-1">Tab Header 1</gux-tab>
    <gux-tab tab-id="2-2">Tab Header 2</gux-tab>
    <gux-tab tab-id="2-3">Tab Header 3</gux-tab>
    <gux-tab gux-disabled tab-id="2-4"
      >Tab Header 4</gux-tab
    >
    <gux-tab gux-disabled="true" tab-id="2-5"
      >Tab Header 5</gux-tab
    >
</gux-tab-list>
<gux-tab-panel tab-id="2-1">Tab content 1</gux-tab-panel>
<gux-tab-panel tab-id="2-2">Tab content 2</gux-tab-panel>
<gux-tab-panel tab-id="2-3">Tab content 3</gux-tab-panel>
<gux-tab-panel tab-id="2-4">Tab content 4</gux-tab-panel>
<gux-tab-panel tab-id="2-5">Tab content 5</gux-tab-panel>`
};
