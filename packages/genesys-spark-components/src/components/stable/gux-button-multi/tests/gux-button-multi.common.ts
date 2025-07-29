const accents = ['primary', 'secondary', 'tertiary', 'invalid'];
export const renderConfigs = [
  ...accents.map((accent: string) => ({
    description: `Should render as expected for "${accent}" accent`,
    html: `<gux-button-multi lang="en" accent="${accent}">
    <span slot="title">Primary</span>
    <gux-list-item>Test 1</gux-list-item>
    <gux-list-item>Test 2</gux-list-item>
    <gux-list-item>Test 3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item>Test 4</gux-list-item>
  </gux-button-multi>`
  })),
  ...accents.map((accent: string) => ({
    description: `Should render as expected for "${accent}" accent disabled`,
    html: `<gux-button-multi lang="en" accent="${accent}" disabled>
    <span slot="title">Primary</span>
    <gux-list-item>Test 1</gux-list-item>
    <gux-list-item>Test 2</gux-list-item>
    <gux-list-item>Test 3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item>Test 4</gux-list-item>
  </gux-button-multi>`
  }))
];
