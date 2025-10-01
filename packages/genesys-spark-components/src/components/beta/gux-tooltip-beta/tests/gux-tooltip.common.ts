export const renderConfigs = [
  {
    description: 'should link to sibling element',
    html: `
      <div id="element" lang="en">
        <div>Element</div>
        <gux-tooltip-beta>
          <span slot="content">Tooltip</span>
        </gux-tooltip-beta>
      </div>
    `
  },
  {
    description: 'should link to "for" element',
    html: `
      <div lang="en">
        <div id="element">Element</div>
        <gux-tooltip-beta for="element">
          <div slot="content">Tooltip</div>
        </gux-tooltip-beta>
      </div>
    `
  }
];
