import { newSpecPage } from '@test/specTestUtils';
import { GuxTextHighlight } from '../gux-text-highlight';

const components = [GuxTextHighlight];
const language = 'en';

describe('gux-text-highlight', () => {
  describe('#render', () => {
    [
      {
        description: 'should render start strategy',
        html: `
          <gux-text-highlight
            highlight="Some text"
            text="Some text to highlight in the tests"
            strategy="start"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render start strategy case insensitively',
        html: `
          <gux-text-highlight
            highlight="some text"
            text="Some text to highlight in the tests"
            strategy="start"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render start strategy when no match found',
        html: `
          <gux-text-highlight
            highlight="Other text"
            text="Some text to highlight in the tests"
            strategy="start"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render contains strategy',
        html: `
          <gux-text-highlight
            highlight="te"
            text="Some text to highlight in the tests"
            strategy="contains"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render contains strategy case insensitively',
        html: `
          <gux-text-highlight
            highlight="TE"
            text="Some text to highlight in the tests"
            strategy="contains"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render contains strategy when no match found',
        html: `
          <gux-text-highlight
            highlight="Other text"
            text="Some text to highlight in the tests"
            strategy="contains"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render fuzzy strategy',
        html: `
          <gux-text-highlight
            highlight="text test"
            text="Some text to highlight in the tests"
            strategy="fuzzy"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render fuzzy strategy case insensitively',
        html: `
          <gux-text-highlight
            highlight="TEXT TEST"
            text="Some text to highlight in the tests"
            strategy="fuzzy"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render fuzzy strategy when no match found',
        html: `
          <gux-text-highlight
            highlight="Other word"
            text="Some text to highlight in the tests"
            strategy="fuzzy"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render default strategy',
        html: `
          <gux-text-highlight
            highlight="Some text"
            text="Some text to highlight in the tests"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render default strategy case insensitively',
        html: `
          <gux-text-highlight
            highlight="some text"
            text="Some text to highlight in the tests"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should render default strategy when no match found',
        html: `
          <gux-text-highlight
            highlight="Other text"
            text="Some text to highlight in the tests"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should handle no highlight property',
        html: `
          <gux-text-highlight
            text="Some text to highlight in the tests"
          ></gux-text-highlight>
        `
      },
      {
        description: 'should handle no text property',
        html: `
          <gux-text-highlight
            highlight="Other text"
          ></gux-text-highlight>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxTextHighlight);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
