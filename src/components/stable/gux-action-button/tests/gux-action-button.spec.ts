import { newSpecPage } from '@stencil/core/testing';
import { GuxActionButton } from '../gux-action-button';
import { GuxActionItem } from '../../../beta/gux-action-list/gux-action-item/gux-action-item';

const components = [GuxActionButton, GuxActionItem];
const html = `
<gux-action-button lang="en" text="Primary" accent="primary">
  <gux-action-item text="test"></gux-action-item>
  <gux-action-item text="test2"></gux-action-item>
  <gux-action-item text="test3"></gux-action-item>
  <gux-list-divider></gux-list-divider>
  <gux-action-item><span>I am a span</span></gux-action-item>
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
    <gux-action-button lang="en" text="Primary" accent="primary" disabled>
      <gux-action-item text="test"></gux-action-item>
      <gux-action-item text="test2"></gux-action-item>
      <gux-action-item text="test3"></gux-action-item>
      <gux-list-divider></gux-list-divider>
      <gux-action-item><span>I am a span</span></gux-action-item>
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
    const page = await newSpecPage({ components, html, language });
    const openSpy = jest.fn();
    const closeSpy = jest.fn();

    page.win.addEventListener('open', openSpy);
    page.win.addEventListener('close', closeSpy);

    const element = document.querySelector('gux-action-button');
    const dropdownButton = element.shadowRoot.querySelector(
      '.gux-dropdown-button > button'
    );

    dropdownButton.click();
    dropdownButton.click();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not fire open event if disabled', async () => {
    const disableHtml = `
    <gux-action-button lang="en" text="Primary" accent="primary" disabled>
      <gux-action-item text="test"></gux-action-item>
      <gux-action-item text="test2"></gux-action-item>
      <gux-action-item text="test3"></gux-action-item>
      <gux-list-divider></gux-list-divider>
      <gux-action-item><span>I am a span</span></gux-action-item>
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

  it('should fire press event if action-item not disabled', async () => {
    const page = await newSpecPage({ components, html, language });
    const pressSpy = jest.fn();

    page.win.addEventListener('press', pressSpy);

    const actionItem = document.querySelector('gux-action-item') as HTMLElement;
    actionItem.click();

    expect(pressSpy).toHaveBeenCalledTimes(1);
  });

  it('should not fire press event if action-item disabled', async () => {
    const disableHtml = `
    <gux-action-button lang="en" text="Primary" accent="primary">
      <gux-action-item text="test" disabled></gux-action-item>
      <gux-action-item text="test2"></gux-action-item>
      <gux-action-item text="test3"></gux-action-item>
      <gux-list-divider></gux-list-divider>
      <gux-action-item><span>I am a span</span></gux-action-item>
    </gux-action-button>
    `;
    const page = await newSpecPage({ components, html: disableHtml, language });
    const pressSpy = jest.fn();

    page.win.addEventListener('press', pressSpy);

    const actionItem = document.querySelector('gux-action-item') as HTMLElement;
    actionItem.click();

    expect(pressSpy).toHaveBeenCalledTimes(0);
  });
});
