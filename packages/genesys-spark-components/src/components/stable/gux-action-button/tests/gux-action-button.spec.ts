import { newSpecPage } from '@stencil/core/testing';
import { GuxActionButton } from '../gux-action-button';
import { GuxList } from '../../gux-list/gux-list';
import { GuxListDivider } from '../../gux-list/gux-list-divider/gux-list-divider';
import { GuxListItem } from '../../gux-list/gux-list-item/gux-list-item';

const components = [GuxActionButton, GuxList, GuxListDivider, GuxListItem];
const html = `
<gux-action-button lang="en" accent="primary">
  <div slot="title">Primary</div>
  <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
  <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
  <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
  <gux-list-divider></gux-list-divider>
  <gux-list-item onclick="notify(event)">Test 4</gux-list-item>
</gux-action-button>
`;
const language = 'en';

describe('gux-action-button', () => {
  it('should build', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.rootInstance).toBeInstanceOf(GuxActionButton);
  });

  it('renders', async () => {
    const page = await newSpecPage({ components, html, language });

    expect(page.root).toMatchSnapshot();
  });

  it('should fire actionClick event if not disabled', async () => {
    const page = await newSpecPage({ components, html, language });
    const actionClickSpy = jest.fn();

    page.win.addEventListener('actionClick', actionClickSpy);

    const element = document.querySelector('gux-action-button');
    const actionButton = element.shadowRoot.querySelector(
      '.gux-action-button > button'
    );

    actionButton.click();

    expect(actionClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should not fire actionClick event if disabled', async () => {
    const disableHtml = `
    <gux-action-button lang="en" accent="primary" disabled>
      <div slot="title">Primary</div>
      <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
      <gux-list-divider></gux-list-divider>
      <gux-list-item onclick="notify(event)">Test 4</gux-list-item>
    </gux-action-button>
    `;
    const page = await newSpecPage({ components, html: disableHtml, language });
    const actionClickSpy = jest.fn();

    page.win.addEventListener('actionClick', actionClickSpy);

    const element = document.querySelector('gux-action-button');
    const actionButton = element.shadowRoot.querySelector(
      '.gux-action-button > button'
    );

    actionButton.click();

    expect(actionClickSpy).toHaveBeenCalledTimes(0);
  });

  it('should fire open and close events if not disabled', async () => {
    jest.useFakeTimers('legacy');
    const page = await newSpecPage({ components, html, language });
    const openSpy = jest.fn();
    const closeSpy = jest.fn();

    page.win.addEventListener('open', openSpy);
    page.win.addEventListener('close', closeSpy);

    const element = document.querySelector('gux-action-button');
    const dropdownButton = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    );

    dropdownButton.dispatchEvent(
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true
      })
    );
    jest.runAllTimers();

    dropdownButton.dispatchEvent(
      new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true
      })
    );
    jest.runAllTimers();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not fire open event if disabled', async () => {
    const disableHtml = `
    <gux-action-button lang="en" accent="primary" disabled>
      <div slot="title">Primary</div>
      <gux-list-item onclick="notify(event)">Test 1</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 2</gux-list-item>
      <gux-list-item onclick="notify(event)">Test 3</gux-list-item>
      <gux-list-divider></gux-list-divider>
      <gux-list-item onclick="notify(event)">Test 4</gux-list-item>
    </gux-action-button>
    `;
    const page = await newSpecPage({ components, html: disableHtml, language });
    const openSpy = jest.fn();

    page.win.addEventListener('open', openSpy);

    const element = document.querySelector('gux-action-button');
    const dropdownButton = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    );

    dropdownButton.click();

    expect(openSpy).toHaveBeenCalledTimes(0);
  });
});
