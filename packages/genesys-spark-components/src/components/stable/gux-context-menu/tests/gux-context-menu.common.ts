export const renderConfig = {
  description: 'should render component as expected',
  html: `
  <gux-context-menu>
    <gux-list-item id="list-item-1" onclick="notify(event)">Test 1</gux-list-item>
    <gux-list-item id="list-item-2" onclick="notify(event)">Test 2</gux-list-item>
    <gux-list-item id="list-item-3" onclick="notify(event)">Test 3</gux-list-item>
  </gux-context-menu>
  `
};
