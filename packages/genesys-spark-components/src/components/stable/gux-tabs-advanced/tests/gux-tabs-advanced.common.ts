export const renderConfig = {
  description: 'should render a basic gux-tabs-advanced component',
  html: `<gux-tabs-advanced>
      <gux-tab-advanced-list
        slot="tab-list"
        allow-sort="false"
        show-new-tab-button="true"
      >
        <gux-tab-advanced tab-id="1-1">
          Tab Header 1
        </gux-tab-advanced>
        <gux-tab-advanced tab-id="1-2">
          <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
          Tab Header 2
        </gux-tab-advanced>
        <gux-tab-advanced gux-disabled tab-id="1-3">
          Tab Header 3
        </gux-tab-advanced>
        <gux-tab-advanced tab-id="1-4">
          Tab Header 4
        </gux-tab-advanced>
      </gux-tab-advanced-list>
    <gux-tab-advanced-panel tab-id="1-1">
      <span>Tab content 1</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-2">
      <span>Tab content 2</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-3">
      <span>Tab content 3</span>
    </gux-tab-advanced-panel>
    <gux-tab-advanced-panel tab-id="1-4">
      <span>Tab content 4</span>
    </gux-tab-advanced-panel>

    </gux-tabs-advanced>`
};
