import { toHTML } from '../utils/to-html.js';
import COMPONENT_SPEC from '../components-spec.json';

export function bootstrap() {
  let components = Object.keys(COMPONENT_SPEC)
    .filter(component => !COMPONENT_SPEC[component].hidePage)
    .sort((a, b) => {
      return a < b ? -1 : 1;
    });

  document.body.appendChild(
    toHTML(`
        <main>
            <nav>
                <header>Components</header>
                ${components
                  .map(
                    component =>
                      `<a href="#${component}">${shortName(component)}</a>`
                  )
                  .join('')}
            </nav>
            <iframe id="componentFrame" />
        </main>
    `)
  );

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
