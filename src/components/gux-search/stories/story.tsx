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
        <gux-search></gux-search>
        <gux-search placeholder="Search"></gux-search>
        <gux-search placeholder="Search" value="Genesys"></gux-search>
        <gux-text-label label="Dynamic search (doesn't require enter)">
          <gux-search
            id="dynamicSearch"
            placeholder="Search"
            dynamic-search="true"
          >
          </gux-search>
        </gux-text-label>
        <h2>Interactive sample</h2>
        <gux-search
          id="interactive"
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
