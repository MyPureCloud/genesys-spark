import { toHTML } from '../utils/to-html.js';
import { componentSpecs, getComponentSpec } from '../component-specs.js';
import '../styles/component-listing.less';

export function bootstrap() {
  let components = Object.keys(componentSpecs)
    .filter(component => !componentSpecs[component].hidePage)
    .sort((a, b) => {
      return shortName(a) < shortName(b) ? -1 : 1;
    });

  document.body.appendChild(
    toHTML(`
        <main>
            <nav class="components-list">
                <div class="sticky-header">
                    <h2>Components</h2>
                    <gux-form-field class="component-search-field" label-position="screenreader">
                      <input
                        id="component-search-box"
                        slot="input"
                        name="search"
                        type="search"
                        placeholder="Enter a search"
                      />
                      <label slot="label" for="component-search-field">Search for a component</label>
                    </gux-form-field>
                </div>
                ${components
                  .map(component => {
                    let name = shortName(component);
                    if (getComponentSpec(component).beta) {
                      name += `<sup> 𝜷</sup>`;
                    }
                    return `<a class="component-item" href="#${component}">${name}</a>`;
                  })
                  .join('')}
            </nav>
            <iframe id="componentFrame" />
        </main>
    `)
  );

  const searchHandler = event => {
    const searchText = event.target.value;
    document
      .querySelectorAll('.components-list .component-item')
      .forEach(item => {
        if (item.textContent.toLowerCase().includes(searchText.toLowerCase())) {
          item.classList.remove('hide-item');
        } else {
          item.classList.add('hide-item');
        }
      });
  };

  const searchBox = document.getElementById('component-search-box');
  searchBox.addEventListener('input', searchHandler);

  const hashHandler = event => {
    let iframe = document.getElementById('componentFrame');
    let hash = window.location.hash || `#${components[0]}`;

    iframe.src = `./${hash.slice(1)}.html`;
  };

  window.addEventListener('hashchange', hashHandler);
  hashHandler();
}

function shortName(component) {
  return component.replace(/^gux-/, '');
}

bootstrap();
