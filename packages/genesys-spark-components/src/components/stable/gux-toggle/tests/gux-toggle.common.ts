export const renderConfigs = [
  '<gux-toggle></gux-toggle>',
  '<gux-toggle checked></gux-toggle>',
  '<gux-toggle checked disabled></gux-toggle>',
  '<gux-toggle label="On"></gux-toggle>',
  '<gux-toggle checked label="on"></gux-toggle>',
  `<gux-toggle
    label="On"
    label-position="left"
  ></gux-toggle>`,
  `<gux-toggle
    checked
    label="on"
    label-position="right"
  ></gux-toggle>`,
  `<gux-toggle
    label="This is a long label for the toggle to test how it works"
    label-position="left"
  ></gux-toggle>`,
  `<gux-toggle
    checked
    label="This is a long label for the toggle to test how it works"
    label-position="right"
  ></gux-toggle>`,
  // remove deprecated props COMUI-3368
  '<gux-toggle></gux-toggle>',
  '<gux-toggle checked></gux-toggle>',
  '<gux-toggle checked disabled></gux-toggle>',
  '<gux-toggle checked-label="On" unchecked-label="Off"></gux-toggle>',
  '<gux-toggle checked checked-label="on" unchecked-label="off"></gux-toggle>',
  `<gux-toggle
    checked-label="On"
    unchecked-label="Off"
    label-position="left"
  ></gux-toggle>`,
  `<gux-toggle
    checked
    checked-label="on"
    unchecked-label="off"
    label-position="right"
  ></gux-toggle>`,
  `<gux-toggle
    checked-label="This is a long label for the toggle to test how it works"
    unchecked-label="This is another long label for the toggle to test how it works"
    label-position="left"
  ></gux-toggle>`,
  `<gux-toggle
    checked
    checked-label="This is a long label for the toggle to test how it works"
    unchecked-label="This is another long label for the toggle to test how it works"
    label-position="right"
  ></gux-toggle>`
].map((html, index) => {
  return {
    description: `should render component as expected (${index + 1})`,
    html
  };
});
