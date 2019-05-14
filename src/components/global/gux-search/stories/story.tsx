import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Search',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <h2>Basic samples</h2>
        <gux-search label="Search" label-position="top"></gux-search>
        <gux-search label="Search with placeholder" placeholder="Search"></gux-search>
        <gux-search label="Search with pre-defined value" placeholder="Search" value="Genesys"></gux-search>
        <gux-search 
          id="dynamicSearch"
          label="Dynamic search (doesn't require enter)"
          placeholder="Search"
          dynamic-search="true">
        </gux-search>
        <h2>Interactive sample</h2>
        <gux-search
          id="interactive"
          label=${text('label', 'Search')}
          placeholder=${text('placeholder', 'placeholder')}
          value=${text('value', 'value')}
          disabled=${boolean('disabled', false)}
          dynamic-search=${boolean('dynamic-search', false)}
        >
        </gux-search>
      `,
      el
    );

    setTimeout(() => {
      const it = document.getElementById('interactive');
      it.addEventListener('search', (e: CustomEvent) =>
        action('search')(e.detail)
      );

      const dynamicSearch = document.getElementById('dynamicSearch');
      dynamicSearch.addEventListener('search', (e: CustomEvent) =>
        action('dynamic-search')(e.detail)
      );
    }, 100);

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
