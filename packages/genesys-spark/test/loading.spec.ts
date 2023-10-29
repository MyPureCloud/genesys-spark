import { checkAndLoadFonts, checkAndLoadScript, checkAndLoadStyle } from '../src/loading';

const SCRIPT_URL = 'https://localhost/script.js';
const STYLE_URL = 'https://localhost/style.css';
const FONTS = {
  "Font1": `font1.css`,
  "Font2": `font2.css`
}

describe('The loading module', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  describe('checkAndLoadScript', () => {
    test('will create a new script tag and wait for it to load', async () => {
      const promise = checkAndLoadScript(SCRIPT_URL);
      const tag = document.querySelector(`script[src="${SCRIPT_URL}"]`);

      expect(tag).not.toBeNull(); // The tag was created
      tag?.dispatchEvent(new Event('load')); // The promise will resolve

      expect(promise).resolves.toBe(undefined);
    });
    test('will fail if the script fails to load', async () => {
      const promise = checkAndLoadScript(SCRIPT_URL);
      const tag = document.querySelector(`script[src="${SCRIPT_URL}"]`);

      expect(tag).not.toBeNull(); // The tag was created
      tag?.dispatchEvent(new Event('error')); // The promise will reject

      expect(promise).rejects.toContain(SCRIPT_URL);
    });
    test('will not create a tag if one already exists', async () => {
      const script = document.createElement('script');
      script.setAttribute('src', SCRIPT_URL);
      document.body.appendChild(script);

      await checkAndLoadScript(SCRIPT_URL); // Should resolve immediately
      const tags = document.querySelectorAll(`script[src="${SCRIPT_URL}"]`);
      expect(tags.length).toBe(1); // A second tag was not created
    });
  });
  describe('checkAndLoadStyle', () => {
    test('will create a new link tag and wait for it to load', async () => {
      const promise = checkAndLoadStyle(STYLE_URL);
      const tag = document.querySelector(
        `link[href="${STYLE_URL}"][rel="stylesheet"]`
      );

      expect(tag).not.toBeNull(); // The tag was created
      tag?.dispatchEvent(new Event('load')); // The promise will resolve

      expect(promise).resolves.toBe(undefined);
    });
    test('will fail if the style fails to load', async () => {
      const promise = checkAndLoadStyle(STYLE_URL);
      const tag = document.querySelector(
        `link[href="${STYLE_URL}"][rel="stylesheet"]`
      );

      expect(tag).not.toBeNull(); // The tag was created
      tag?.dispatchEvent(new Event('error')); // The promise will reject

      expect(promise).rejects.toContain(STYLE_URL);
    });
    test('will not create a tag if one already exists', async () => {
      const link = document.createElement('link');
      link.setAttribute('href', STYLE_URL);
      link.setAttribute('rel', 'stylesheet');
      document.body.appendChild(link);

      await checkAndLoadStyle(STYLE_URL); // Should resolve immediately
      const tags = document.querySelectorAll(`link[href="${STYLE_URL}"]`);
      expect(tags.length).toBe(1); // A second tag was not created
    });
  });
  describe("checkAndLoadFonts", () => {
    let documentFonts : Array<any> = [];

    beforeEach(() => {
      documentFonts = [];
      //@ts-ignore - needed to be able to stub out font API
      document.fonts = documentFonts;
    })

    test('Will load missing fonts', async () => {
      const promise = checkAndLoadFonts(FONTS);
      const tag1 = document.querySelector(`link[href="font1.css"]`);
      const tag2 = document.querySelector(`link[href="font2.css"]`);

      expect(tag1).not.toBeNull();
      expect(tag2).not.toBeNull();

      tag1?.dispatchEvent(new Event("load"));
      tag2?.dispatchEvent(new Event("load"));

      expect(promise).resolves.toBe(undefined);
    });

    test('Will not load fonts that are already loaded', async () => {
      documentFonts.push({family: "Font2"});

      const promise = checkAndLoadFonts(FONTS);
      const tag1 = document.querySelector(`link[href="font1.css"]`);
      const tag2 = document.querySelector(`link[href="font2.css"]`);

      expect(tag1).not.toBeNull();
      expect(tag2).toBeNull();

      tag1?.dispatchEvent(new Event("load"));

      expect(promise).resolves.toBe(undefined);
    })

    test('Ignores quotes on the family when checking for loaded fonts', async () => {
      documentFonts.push({family: '"Font2"'});

      const promise = checkAndLoadFonts(FONTS);
      const tag1 = document.querySelector(`link[href="font1.css"]`);
      const tag2 = document.querySelector(`link[href="font2.css"]`);

      expect(tag1).not.toBeNull();
      expect(tag2).toBeNull();

      tag1?.dispatchEvent(new Event("load"));

      expect(promise).resolves.toBe(undefined);
    })

    test('Still resolves even if fonts fail to load', async () => {
      const promise = checkAndLoadFonts(FONTS);
      const tag1 = document.querySelector(`link[href="font1.css"]`);
      const tag2 = document.querySelector(`link[href="font2.css"]`);

      expect(tag1).not.toBeNull();
      expect(tag2).not.toBeNull();

      tag1?.dispatchEvent(new Event("error"));
      tag2?.dispatchEvent(new Event("error"));

      expect(promise).resolves.toBe(undefined);
    });
  });
});
