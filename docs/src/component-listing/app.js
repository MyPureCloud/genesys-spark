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
                    <div class="logo">${sparkLogo}</div>
                    <gux-form-field class="component-search-field" label-position="screenreader">
                      <input
                        id="component-search-box"
                        slot="input"
                        name="search"
                        type="search"
                        placeholder="Enter a search"
                      />
                      <label slot="label" for="component-search-box">Search for a component</label>
                    </gux-form-field>
                    <h2>Components</h2>
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

var sparkLogo = `
<svg role="img" aria-label="Spark" viewBox="0 0 89.99 23.98" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style type="text/css">
       @import url('https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic');
    </style>
    <style>
      .cls-1{fill:#f0522a;}
      .cls-2,
      .cls-3{fill:#444a52;}
      .cls-3{font-size:6.5px;font-family:Roboto-Regular, Roboto;}
      .cls-4{letter-spacing:-0.02em;}
    </style>

  </defs>
  <g data-name="Layer 2" id="Layer_2">
    <g data-name="Layer 1" id="Layer_1-2">
      <path d="M15.46,10.45a1.06,1.06,0,0,0-.7-.64L8.49,8.13V1a1,1,0,0,0-.75-1A1,1,0,0,0,6.58.47L2.13,7.15h0L.18,10.07A1,1,0,0,0,.07,11a1,1,0,0,0,.7.64l6.28,1.68v7.09A1,1,0,0,0,9,21l4.45-6.69h0l1.94-2.91A1.07,1.07,0,0,0,15.46,10.45Zm-1.6.61-.16.23h0l-1.32,2-3.89-1V9.62ZM7.05,2.35v5.4L4,6.93ZM1.68,10.41l.15-.23h0l1.32-2L7.05,9.24v2.61Zm6.81,8.71V13.73l3,.81Z" class="cls-1"></path>
      <path d="M26.25,10.14a1,1,0,0,0-.39-.86,4.85,4.85,0,0,0-1.36-.63A13.84,13.84,0,0,1,22.91,8a3,3,0,0,1-2-2.72,2.37,2.37,0,0,1,.5-1.51,3.28,3.28,0,0,1,1.42-1,5.6,5.6,0,0,1,2.06-.37,4.92,4.92,0,0,1,2,.4,3.25,3.25,0,0,1,1.38,1.14,3,3,0,0,1,.49,1.68H26.26a1.24,1.24,0,0,0-.39-1,1.53,1.53,0,0,0-1.05-.35,1.72,1.72,0,0,0-1.05.29.87.87,0,0,0,0,1.48,5.47,5.47,0,0,0,1.5.66,9,9,0,0,1,1.76.75,3,3,0,0,1,1.68,2.66,2.55,2.55,0,0,1-1,2.14,4.6,4.6,0,0,1-2.81.77,5.58,5.58,0,0,1-2.27-.45,3.39,3.39,0,0,1-1.54-1.24,3.23,3.23,0,0,1-.52-1.81h2.51a1.57,1.57,0,0,0,.43,1.23,2,2,0,0,0,1.39.39,1.58,1.58,0,0,0,1-.26A.88.88,0,0,0,26.25,10.14Z" class="cls-2"></path>
      <path d="M38.35,9.38v3.51h-2.5V2.54H40a4.7,4.7,0,0,1,2.1.44A3.31,3.31,0,0,1,43.5,4.22,3.44,3.44,0,0,1,44,6.05a3,3,0,0,1-1.09,2.42,4.5,4.5,0,0,1-3,.91Zm0-1.93H40a1.58,1.58,0,0,0,1.11-.36,1.37,1.37,0,0,0,.38-1,1.68,1.68,0,0,0-.39-1.16A1.44,1.44,0,0,0,40,4.46H38.35Z" class="cls-2"></path>
      <path d="M55.77,11H52.35l-.6,1.93H49.08l3.8-10.35h2.35l3.82,10.35H56.37ZM52.94,9h2.23L54.05,5.44Z" class="cls-2"></path>
      <path d="M69.47,9.23H68.12v3.66H65.63V2.54H69.7a4.57,4.57,0,0,1,2.88.81,2.79,2.79,0,0,1,1,2.31,3.37,3.37,0,0,1-.44,1.79A3,3,0,0,1,71.81,8.6L74,12.78v.11H71.3ZM68.12,7.31H69.7a1.41,1.41,0,0,0,1.07-.38,1.43,1.43,0,0,0,.36-1,1.45,1.45,0,0,0-.36-1,1.39,1.39,0,0,0-1.07-.38H68.12Z" class="cls-2"></path>
      <path d="M84.47,9l-1,1.12v2.73H81V2.54h2.5V7.1l.86-1.31,2.24-3.25h3.08l-3.5,4.58,3.5,5.77h-3Z" class="cls-2"></path>
      <text style="font-family: 'Roboto';" transform="translate(20.58 22.22)" class="cls-3">Web Component Lib<tspan y="0" x="58.53" class="cls-4">r</tspan><tspan y="0" x="60.6">ary</tspan></text>
    </g>
  </g>
</svg>`;

bootstrap();
