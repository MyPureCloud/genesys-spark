import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { GuxContextSearchBeta } from '../gux-context-search-beta';

const components = [GuxContextSearchBeta];
const language = 'en';

describe('gux-context-search-beta', () => {
  beforeEach(async () => {
    (global as any).MutationObserver = MutationObserver;
  });

  describe('#render', () => {
    [
      {
        description: 'should render default control no props',
        html:
          '<gux-context-search-beta><input type="text"/></gux-context-search-beta>'
      },
      {
        description: 'should render default control no props With placeholder',
        html:
          '<gux-context-search-beta><input type="text" placeholder="Search"/></gux-context-search-beta>'
      },
      {
        description: 'should render default control with all props',
        html: `<gux-context-search-beta current-match="1"match-count="10">
          <input type="text" placeholder="Search" value="Default Search Text"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with no match',
        html: `<gux-context-search-beta current-match="0" match-count="0">
          <input type="text" placeholder="Search" value="Default Search Text"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with long text no match',
        html: `<gux-context-search-beta current-match="0" match-count="0">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
         </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with long text 1 match',
        html: `<gux-context-search-beta current-match="1" match-count="1">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with short text 100000 match',
        html: `<gux-context-search-beta current-match="1000" match-count="100000">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor "/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with long text 100000 match',
        html: `<gux-context-search-beta current-match="1000" match-count="100000">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with invalid  match count',
        html: `<gux-context-search-beta current-match="1000" match-count="abc">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props with invalid current match',
        html: `<gux-context-search-beta current-match="100000" match-count="100">
          <input type="text" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode',
        html: `<gux-context-search-beta current-match="10" match-count="10">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode with no match',
        html: `<gux-context-search-beta current-match="0" match-count="0">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with no Match"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode with 1 match',
        html: `<gux-context-search-beta current-match="1" match-count="1">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with 1 match"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode with 100000000 match',
        html: `<gux-context-search-beta current-match="10000" match-count="100000000">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled with big match"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode with long value',
        html: `<gux-context-search-beta current-match="1" match-count="1">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode with long value with 100000000 match',
        html: `<gux-context-search-beta current-match="1100" match-count="100000001">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable navigate mode',
        html: `<gux-context-search-beta current-match="1" match-count="10" disable-navigation="true">
          <input type="text" placeholder="Search" value="Navigation Disabled"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable navigate mode with no matches',
        html: `<gux-context-search-beta current-match="0" match-count="0" disable-navigation="true">
          <input type="text" placeholder="Search" value="Navigation Disabled"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable navigate mode with 1 matches',
        html: `<gux-context-search-beta current-match="0" match-count="1" disable-navigation="true">
          <input type="text" placeholder="Search" value="Navigation Disabled"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable navigate mode with 100000000 matches',
        html: `<gux-context-search-beta current-match="1000" match-count="100000000" disable-navigation="true">
          <input type="text" placeholder="Search" value="Navigation Disabled"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode',
        html: `<gux-context-search-beta current-match="1" match-count="10" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled Navigation Disable"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode with no match',
        html: `<gux-context-search-beta current-match="0" match-count="0" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled Navigation Disable"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode with 1 match',
        html: `<gux-context-search-beta current-match="1" match-count="1" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled Navigation Disable"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode with 1000000 match',
        html: `<gux-context-search-beta current-match="1" match-count="1000000" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Search Disabled Navigation Disable"/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode with 100 match & long text',
        html: `<gux-context-search-beta current-match="1" match-count="10" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      },
      {
        description:
          'should render default control with all props in disable mode & disable Navigate Mode with 1000000 match & long text',
        html: `<gux-context-search-beta current-match="1" match-count="1000000" disable-navigation="true">
          <input type="text" disabled="true" placeholder="Search" value="Lorem ipsum dolor sit amet, lacinia blandit ultricies lorem aliquam, dui quam a viverra vivamus pellentesque, rhoncus aliquet proin eleifend."/>
        </gux-context-search-beta>`
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });
        const component = page.rootInstance;
        expect(component).toBeInstanceOf(GuxContextSearchBeta);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('Class Logic', () => {
    let component: GuxContextSearchBeta;

    beforeEach(async () => {
      const page = await newSpecPage({
        components: [GuxContextSearchBeta],
        html: `<gux-context-search-beta current-match="1" match-count="10"><input type="text" placeholder="Search" value="Default Search Text"/></gux-context-search-beta>`,
        language: 'en'
      });
      component = page.rootInstance;
    });

    it('builds', async () => {
      await component.componentWillLoad();
      component.render();
      expect(component).toBeTruthy();
    });

    it('componentWillLoad with invalid match value', async () => {
      component.matchCount = -1;
      await component.componentWillLoad();
      component.render();
      expect(component.matchCount).toBe(0);
    });

    it('componentWillLoad with invalid currentMatch', async () => {
      component.currentMatch = -1;
      component.matchCount = 1;
      await component.componentWillLoad();
      component.render();
      expect(component.matchCount).toBe(1);
      expect(component.currentMatch).toBe(1);
    });

    it('componentWillLoad with invalid currentMatch & matchCount', async () => {
      component.currentMatch = -1;
      component.matchCount = -1;
      await component.componentWillLoad();
      component.render();
      expect(component.matchCount).toBe(0);
      expect(component.currentMatch).toBe(0);
    });

    it('componentWillLoad with currentMatch greater than matchCount', async () => {
      component.currentMatch = 11;
      component.matchCount = 10;
      await component.componentWillLoad();
      component.render();
      expect(component.matchCount).toBe(10);
      expect(component.currentMatch).toBe(1);
    });

    it('componentDidLoad with currentMatch when matchCount is 0', async () => {
      component.currentMatch = 11;
      component.matchCount = 0;
      await component.componentWillLoad();
      component.render();
      expect(component.matchCount).toBe(0);
      expect(component.currentMatch).toBe(0);
    });

    describe('methods', () => {
      it('clear', async () => {
        const guxCurrentMatchChangedSpy = jest.fn();
        component.guxcurrentmatchchanged = {
          emit: guxCurrentMatchChangedSpy
        };
        component.matchCount = 100;
        component.currentMatch = 3;
        await component.clear();
        expect(component.matchCount).toEqual(0);
        expect(component.currentMatch).toEqual(0);
        expect(component.guxcurrentmatchchanged.emit).toHaveBeenCalledWith(0);
      });

      it('clear when disable is true', async () => {
        const page = await newSpecPage({
          components: [GuxContextSearchBeta],
          html: `<gux-context-search-beta current-match="1" match-count="10"><input disabled="true" type="text" placeholder="Search" value="Default Search Text"/></gux-context-search-beta>`,
          language: 'en'
        });
        component = page.rootInstance;
        const guxCurrentMatchChangedSpy = jest.fn();
        component.guxcurrentmatchchanged = {
          emit: guxCurrentMatchChangedSpy
        };
        component.matchCount = 100;
        component.currentMatch = 3;
        await component.clear();
        expect(component.matchCount).not.toEqual(0);
        expect(component.currentMatch).not.toEqual(0);
        expect(component.guxcurrentmatchchanged.emit).not.toHaveBeenCalledWith(
          0
        );
      });
    });
  });
});
