import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'color-contrast',
    target: 'gux-content-search,span',
    exclusionReason:
      'WCAG 1.4.3 Contrast (Minimum), inactive user interface components do not need to meet contrast minimum'
  },
  {
    issueId: 'target-size',
    target: 'input',
    exclusionReason:
      'COMUI-2945 Fix any of the following: Target has insufficient size (134px by 14px, should be at least 24px by 24px); Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of 0px instead of at least 24px.'
  }
];

describe('gux-content-search', () => {
  describe('#render', () => {
    [
      {
        description: 'default control with 0 Match',
        html: `<gux-content-search
          lang="en"
          current-match="0"
          match-count="0">
          <input type="text"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 1 Match',
        html: `<gux-content-search
          lang="en"
          current-match="1"
          match-count="1">
          <input type="text"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 2 Match',
        html: `<gux-content-search
          lang="en"
          current-match="1"
          match-count="2">
          <input type="text"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 2000000 Match',
        html: `<gux-content-search
          lang="en"
          current-match="1"
          match-count="2000000">
          <input type="text"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 0 Match disabled= "true"',
        html: `<gux-content-search
          lang="en"
          current-match="0"
          match-count="0">
          <input type="text"
          disabled="true"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 1 Match disabled= "true"',
        html: `<gux-content-search
          lang="en"
          current-match="1"
          match-count="1">
          <input type="text"
          disabled="true"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 2 Match disabled= "true"',
        html: `<gux-content-search
          lang="en"
          current-match="2"
          match-count="2">
          <input type="text"
          disabled="true"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      },
      {
        description: 'default control with 200000 Match disabled= "true"',
        html: `<gux-content-search
          lang="en"
          current-match="2"
          match-count="200000">
          <input type="text"
          disabled="true"
          placeholder="Search"
          value="Default Search Text"/>
        </gux-content-search>`
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-content-search');
        const previousButton = await element.find(
          'pierce/.gux-previous-button'
        );
        const nextButton = await element.find('pierce/.gux-next-button');
        const clearButton = await element.find('pierce/.gux-clear-button');
        const input = await element.find('input');

        await page.waitForChanges();
        await a11yCheck(page, axeExclusions);
        expect(element.outerHTML).toMatchSnapshot();

        await previousButton.click();
        await page.waitForChanges();
        expect(element.outerHTML).toMatchSnapshot();

        await nextButton.click();
        await page.waitForChanges();
        expect(element.outerHTML).toMatchSnapshot();

        await clearButton.click();
        await page.waitForChanges();
        expect(element.outerHTML).toMatchSnapshot();

        await input.press('KeyT');
        await input.press('KeyE');
        await input.press('KeyS');
        await input.press('KeyT');
        await page.waitForChanges();
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('clear button', () => {
    it('should appear when the value is not empty', async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-content-search lang="en" current-match="1" match-count="20">
          <input type="text" />
        </gux-content-search>`
      });

      let element = await page.find('gux-content-search');
      let clearButton = await element.find('pierce/.gux-clear-button');
      const input = await element.find('input');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');

      expect(clearButton).toBeNull();
      expect(element).toHaveAttribute('hydrated');

      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');
      await page.waitForChanges();
      expect(inputSpy).toHaveReceivedEventTimes(4);
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      expect(clearButton).not.toBeNull();

      let value: string = await input.getProperty('value');
      let currentMatch = await element.getProperty('currentMatch');
      let matchCount = await element.getProperty('matchCount');
      expect(value).toBe('test');
      expect(currentMatch).toBe(1);
      expect(matchCount).toBe(20);
      expect(inputSpy).toHaveReceivedEventTimes(4);

      await clearButton.click();
      await page.waitForChanges();
      value = await input.getProperty('value');
      currentMatch = await element.getProperty('currentMatch');
      matchCount = await element.getProperty('matchCount');
      expect(inputSpy).toHaveReceivedEventTimes(5);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(1);
      expect(value).toBe('');
      expect(currentMatch).toBe(0);
      expect(matchCount).toBe(0);
    });
    it('should not clickable when the disable is true', async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-content-search lang="en" current-match="1" match-count="20" >
          <input type="text" disabled="true" value="TEST" />
        </gux-content-search>
        `
      });

      const element = await page.find('gux-content-search');
      const clearButton = await element.find('pierce/.gux-clear-button');
      const input = await element.find('input');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');
      let value = await input.getProperty('value');
      let currentMatch = await element.getProperty('currentMatch');
      let matchCount = await element.getProperty('matchCount');

      expect(element).toHaveAttribute('hydrated');
      expect(clearButton).not.toBeNull();

      expect(value).toBe('TEST');
      expect(currentMatch).toBe(1);
      expect(matchCount).toBe(20);

      await clearButton.click();
      await page.waitForChanges();

      value = await input.getProperty('value');
      currentMatch = await element.getProperty('currentMatch');
      matchCount = await element.getProperty('matchCount');
      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      expect(value).toBe('TEST');
      expect(currentMatch).toBe(1);
      expect(matchCount).toBe(20);
    });
  });

  describe('navigate buttons', () => {
    it('should appear when the value is not empty', async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-content-search lang="en" current-match="1" match-count="3"><input type="text" value="Test"/></gux-content-search>
        `
      });

      let element = await page.find('gux-content-search');
      let clearButton = await element.find('pierce/.gux-clear-button');
      let nextButton = await element.find('pierce/.gux-next-button');
      let previousButton = await element.find('pierce/.gux-previous-button');
      let resultSpan = await element.find('pierce/.gux-navigation-result');
      let matchCount = await element.getProperty('matchCount');
      let currentMatch = await element.getProperty('currentMatch');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');

      expect(element).toHaveAttribute('hydrated');
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(1);

      await nextButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(1);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(2);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('2 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(2);

      await nextButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(2);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(3);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('3 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(3);

      await nextButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(3);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(1);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(1);

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(4);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(3);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('3 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(3);

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(5);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(2);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('2 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(2);

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(6);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(1);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(1);

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(7);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(3);
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('3 of 3');
      expect(matchCount).toBe(3);
      expect(currentMatch).toBe(3);

      await clearButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventTimes(8);
      expect(guxCurrentMatchChangedSpy).toHaveReceivedEventDetail(0);
      expect(clearButton).toBeNull();
      expect(nextButton).toBeNull();
      expect(previousButton).toBeNull();
      expect(resultSpan).toBeNull();
      expect(matchCount).toBe(0);
      expect(currentMatch).toBe(0);
    });

    it('should be disabled when the match is zero', async () => {
      const page = await newSparkE2EPage({
        html: `<gux-content-search lang="en" current-match="0" match-count="0"><input type="text" value="Test"/></gux-content-search>`
      });

      let element = await page.find('gux-content-search');
      let clearButton = await element.find('pierce/.gux-clear-button');
      let nextButton = await element.find('pierce/.gux-next-button');
      let previousButton = await element.find('pierce/.gux-previous-button');
      let resultSpan = await element.find('pierce/.gux-navigation-result');
      let matchCount = await element.getProperty('matchCount');
      let currentMatch = await element.getProperty('currentMatch');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');

      expect(element).toHaveAttribute('hydrated');
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('0 of 0');
      expect(matchCount).toBe(0);
      expect(currentMatch).toBe(0);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');

      await nextButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('0 of 0');
      expect(matchCount).toBe(0);
      expect(currentMatch).toBe(0);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('0 of 0');
      expect(matchCount).toBe(0);
      expect(currentMatch).toBe(0);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');
    });

    it('should be disabled when the disabled is true', async () => {
      const page = await newSparkE2EPage({
        html: `
          <gux-content-search lang="en" current-match="1" match-count="1"><input type="text" disabled="true" value="Test"/></gux-content-search>
        `
      });

      let element = await page.find('gux-content-search');
      let clearButton = await element.find('pierce/.gux-clear-button');
      let nextButton = await element.find('pierce/.gux-next-button');
      let previousButton = await element.find('pierce/.gux-previous-button');
      let resultSpan = await element.find('pierce/.gux-navigation-result');
      let matchCount = await element.getProperty('matchCount');
      let currentMatch = await element.getProperty('currentMatch');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');

      expect(element).toHaveAttribute('hydrated');
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 1');
      expect(matchCount).toBe(1);
      expect(currentMatch).toBe(1);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');

      await nextButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 1');
      expect(matchCount).toBe(1);
      expect(currentMatch).toBe(1);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');

      await previousButton.click();
      await page.waitForChanges();

      element = await page.find('gux-content-search');
      clearButton = await element.find('pierce/.gux-clear-button');
      nextButton = await element.find('pierce/.gux-next-button');
      previousButton = await element.find('pierce/.gux-previous-button');
      resultSpan = await element.find('pierce/.gux-navigation-result');
      matchCount = await element.getProperty('matchCount');
      currentMatch = await element.getProperty('currentMatch');

      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      expect(clearButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(previousButton).not.toBeNull();
      expect(resultSpan).not.toBeNull();
      expect(resultSpan.innerText).toEqual('1 of 1');
      expect(matchCount).toBe(1);
      expect(currentMatch).toBe(1);
      expect(nextButton).toHaveAttribute('disabled');
      expect(previousButton).toHaveAttribute('disabled');
    });
  });

  describe('Input Field', () => {
    it('should not allow key entry when disabled true', async () => {
      const page = await newSparkE2EPage({
        html: `
        <gux-content-search lang="en" current-match="1" match-count="20"><input type="text" disabled="true" value="" /></gux-content-search>
        `
      });

      const element = await page.find('gux-content-search');
      const clearButton = await element.find('pierce/.gux-clear-button');
      const input = await element.find('input');
      const guxCurrentMatchChangedSpy = await page.spyOnEvent(
        'guxcurrentmatchchanged'
      );
      const inputSpy = await page.spyOnEvent('input');
      let value = input.getAttribute('value');

      expect(input).toHaveAttribute('disabled');
      expect(clearButton).toBeNull();
      expect(value).toBe('');

      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyS');
      await input.press('KeyT');
      await page.waitForChanges();
      expect(inputSpy).not.toHaveReceivedEvent();
      expect(guxCurrentMatchChangedSpy).not.toHaveReceivedEvent();
      value = await input.getProperty('value');

      expect(value).toBe('');
    });
  });
});
