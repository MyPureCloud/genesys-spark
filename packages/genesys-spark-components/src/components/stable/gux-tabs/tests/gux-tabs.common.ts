const orientations = [null, 'horizontal', 'vertical'];
const alignments = [null, 'center', 'fullWidth', 'left'];

const attributeRenderConfigs = orientations
  .flatMap(orientation =>
    alignments.map(alignment => ({ orientation, alignment }))
  )
  .map(({ orientation, alignment }) => {
    const orientationString = orientation ? `orientation="${orientation}"` : '';
    const alignmentString = alignment ? `alignment="${alignment}"` : '';

    return {
      description: `should render as expected when orientation and alignment are set to ${orientation} and ${alignment} respectively`,
      html: `
      <gux-tabs ${orientationString} ${alignmentString}>
        <gux-tab-list slot="tab-list">
          <gux-tab tab-id="a">Tab Header 1</gux-tab>
          <gux-tab tab-id="b">Tab Header 2</gux-tab>
          <gux-tab tab-id="c">Tab Header 3</gux-tab>
          <gux-tab tab-id="d" gux-disabled>Tab Header 4</gux-tab>
          <gux-tab tab-id="e" gux-disabled>Tab Header 5</gux-tab>
        </gux-tab-list>
        <gux-tab-panel tab-id="a">Tab content 1</gux-tab-panel>
        <gux-tab-panel tab-id="b">Tab content 2</gux-tab-panel>
        <gux-tab-panel tab-id="c">Tab content 3</gux-tab-panel>
        <gux-tab-panel tab-id="d">Tab content 4</gux-tab-panel>
        <gux-tab-panel tab-id="e">Tab content 5</gux-tab-panel>
      </gux-tabs>
    `
    };
  });

export const narrowRenderConfig = {
  description: 'should render as expected when tabs overflow their container',
  html: `
    <div style="width: 200px">
      <gux-tabs>
        <gux-tab-list slot="tab-list">
          <gux-tab tab-id="a">Tab Header 1</gux-tab>
          <gux-tab tab-id="b">Tab Header 2</gux-tab>
          <gux-tab tab-id="c">Tab Header 3</gux-tab>
          <gux-tab tab-id="d" gux-disabled>Tab Header 4</gux-tab>
          <gux-tab tab-id="e" gux-disabled>Tab Header 5</gux-tab>
        </gux-tab-list>
        <gux-tab-panel tab-id="a">Tab content 1</gux-tab-panel>
        <gux-tab-panel tab-id="b">Tab content 2</gux-tab-panel>
        <gux-tab-panel tab-id="c">Tab content 3</gux-tab-panel>
        <gux-tab-panel tab-id="d">Tab content 4</gux-tab-panel>
        <gux-tab-panel tab-id="e">Tab content 5</gux-tab-panel>
      </gux-tabs>
    </div>
  `
};

export const renderConfigs = [...attributeRenderConfigs, narrowRenderConfig];

export const renderConfig = renderConfigs[0];
