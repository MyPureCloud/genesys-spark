import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-button', () => {
  describe('#render', () => {
    [
      {
        clickable: true,
        description: 'should render default button',
        html: '<gux-button>Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render primary button',
        html: '<gux-button accent="primary">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render secondary button',
        html: '<gux-button accent="secondary">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render tertiary button',
        html: '<gux-button accent="tertiary">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render ghost button',
        html: '<gux-button accent="ghost">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render danger button',
        html: '<gux-button accent="danger">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render inline button',
        html: '<gux-button accent="inline">Button</gux-button>'
      },
      {
        clickable: true,
        description: 'should render invalid button',
        html: '<gux-button accent="invalid">Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled default button',
        html: '<gux-button disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled primary button',
        html: '<gux-button accent="primary" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled secondary button',
        html: '<gux-button accent="secondary" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled tertiary button',
        html: '<gux-button accent="tertiary" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled ghost button',
        html: '<gux-button accent="ghost" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled danger button',
        html: '<gux-button accent="danger" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled inline button',
        html: '<gux-button accent="inline" disabled>Button</gux-button>'
      },
      {
        clickable: false,
        description: 'should render disabled invalid button',
        html: '<gux-button accent="invalid" disabled>Button</gux-button>'
      }
    ].forEach(({ description, html, clickable }) => {
      it(`${description}: functionality`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-button');
        const onClickSpy = await element.spyOnEvent('click');
        const expectOnclickEvents = clickable ? 1 : 0;

        expect(element.outerHTML).toMatchSnapshot();

        await element.click();
        await page.waitForChanges();

        expect(onClickSpy).toHaveReceivedEventTimes(expectOnclickEvents);
      });

      it(`${description}: accessible`, async () => {
        const page = await newSparkE2EPage({ html });
        await a11yCheck(page);
      });
    });
  });

  describe('click', () => {
    it('should fire a click event when an enabled button slot content is clicked', async () => {
      const html = '<gux-button><span>Span</span></gux-button>';
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-button');
      const onClickSpy = await element.spyOnEvent('click');
      const span = await page.find('span');

      await span.click();
      await page.waitForChanges();

      expect(onClickSpy).toHaveReceivedEventTimes(1);
    });

    it('should not fire a click event when a disabled button slot content is clicked', async () => {
      const html = '<gux-button disabled><span>Span</span></gux-button>';
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-button');
      const onClickSpy = await element.spyOnEvent('click');
      const span = await page.find('span');

      await span.click();
      await page.waitForChanges();

      expect(onClickSpy).toHaveReceivedEventTimes(0);
    });
  });
  describe('focus', () => {
    it('should be programmatically focusable', async () => {
      const html = '<gux-button>Button</gux-button>';
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-button');

      await element.callMethod('focus');
      const focusedElement = await page.evaluateHandle(
        () => document.activeElement.nodeName
      );
      expect(await focusedElement.jsonValue()).toBe('GUX-BUTTON');
    });
  });
});
